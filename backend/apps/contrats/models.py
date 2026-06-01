from django.db import models


class Contrat(models.Model):
    FORMULE_CHOICES = [
        ('starter', 'Starter'),
        ('pro', 'Pro'),
        ('premium', 'Premium'),
    ]
    STATUT_CHOICES = [
        ('actif', 'Actif'),
        ('suspendu', 'Suspendu'),
        ('termine', 'Terminé'),
    ]

    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='contrats')
    numero = models.CharField(max_length=50, unique=True, help_text='Format : LJX-AAAA-NNN')
    formule = models.CharField(max_length=20, choices=FORMULE_CHOICES)
    montant_mensuel = models.DecimalField(max_digits=12, decimal_places=2)
    date_debut = models.DateField()
    date_fin = models.DateField(null=True, blank=True)
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='actif')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contrat'
        verbose_name_plural = 'Contrats'
        indexes = [models.Index(fields=['statut'])]

    def __str__(self):
        return self.numero


class ContratService(models.Model):
    contrat = models.ForeignKey(Contrat, on_delete=models.CASCADE, related_name='contrat_services')
    service = models.ForeignKey('services.Service', on_delete=models.CASCADE, related_name='contrat_services')

    class Meta:
        unique_together = ('contrat', 'service')
        verbose_name = 'Service du contrat'
        verbose_name_plural = 'Services du contrat'


class Facture(models.Model):
    STATUT_CHOICES = [
        ('payee', 'Payée'),
        ('impayee', 'Impayée'),
        ('en_retard', 'En retard'),
    ]

    contrat = models.ForeignKey(Contrat, on_delete=models.CASCADE, related_name='factures')
    numero = models.CharField(max_length=50, unique=True)
    montant_ttc = models.DecimalField(max_digits=12, decimal_places=2)
    tva = models.DecimalField(max_digits=5, decimal_places=2, default=18.00)
    date_emission = models.DateField()
    date_echeance = models.DateField()
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='impayee')

    class Meta:
        ordering = ['-date_emission']
        verbose_name = 'Facture'
        verbose_name_plural = 'Factures'
        indexes = [
            models.Index(fields=['statut']),
            models.Index(fields=['date_echeance']),
        ]

    def __str__(self):
        return self.numero

    @property
    def montant_ht(self):
        return round(self.montant_ttc / (1 + self.tva / 100), 2)
