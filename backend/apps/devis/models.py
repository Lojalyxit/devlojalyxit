from django.db import models


class Devis(models.Model):
    STATUT_CHOICES = [
        ('nouveau', 'Nouveau'),
        ('en_cours', 'En cours'),
        ('envoye', 'Envoyé'),
        ('gagne', 'Gagné'),
        ('perdu', 'Perdu'),
    ]

    user = models.ForeignKey(
        'accounts.User', on_delete=models.SET_NULL,
        null=True, blank=True, related_name='devis'
    )
    nom = models.CharField(max_length=200)
    societe = models.CharField(max_length=200, blank=True)
    email = models.EmailField()
    telephone = models.CharField(max_length=20, blank=True)
    besoin = models.TextField()
    budget = models.CharField(max_length=100, blank=True)
    echeance = models.CharField(max_length=100, blank=True)
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='nouveau')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Devis'
        verbose_name_plural = 'Devis'
        indexes = [models.Index(fields=['statut'])]

    def __str__(self):
        return f'Devis #{self.pk} — {self.nom}'


class DevisService(models.Model):
    devis = models.ForeignKey(Devis, on_delete=models.CASCADE, related_name='devis_services')
    service = models.ForeignKey('services.Service', on_delete=models.CASCADE, related_name='devis_services')

    class Meta:
        unique_together = ('devis', 'service')
        verbose_name = 'Service demandé'
        verbose_name_plural = 'Services demandés'
