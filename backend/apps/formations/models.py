from django.db import models


class Formation(models.Model):
    NIVEAU_CHOICES = [
        ('debutant', 'Débutant'),
        ('intermediaire', 'Intermédiaire'),
        ('avance', 'Avancé'),
        ('tous', 'Tous niveaux'),
    ]

    slug = models.SlugField(unique=True, max_length=120)
    titre = models.CharField(max_length=200)
    domaine = models.CharField(max_length=100)
    duree_heures = models.PositiveSmallIntegerField()
    niveau = models.CharField(max_length=20, choices=NIVEAU_CHOICES)
    programme = models.TextField(blank=True)
    description_longue = models.TextField(blank=True)
    certification = models.CharField(max_length=200, blank=True)
    tarif_min_gnf = models.DecimalField(max_digits=15, decimal_places=0)
    tarif_max_gnf = models.DecimalField(max_digits=15, decimal_places=0)

    class Meta:
        verbose_name = 'Formation'
        verbose_name_plural = 'Formations'

    def __str__(self):
        return self.titre


class FormationModule(models.Model):
    formation = models.ForeignKey(Formation, on_delete=models.CASCADE, related_name='modules')
    titre = models.CharField(max_length=200)
    ordre = models.PositiveSmallIntegerField(default=1)
    duree_heures = models.PositiveSmallIntegerField(default=1)
    objectifs = models.TextField(blank=True)
    contenu = models.TextField(blank=True)
    video_url = models.URLField(blank=True, null=True)
    video_disponible = models.BooleanField(default=False)

    class Meta:
        ordering = ['ordre']
        verbose_name = 'Module'
        verbose_name_plural = 'Modules'

    def __str__(self):
        return f'{self.formation.titre} — M{self.ordre} : {self.titre}'


class Session(models.Model):
    FORMAT_CHOICES = [
        ('presentiel', 'Présentiel'),
        ('en_ligne', 'En ligne'),
        ('intra', 'Intra-entreprise'),
    ]
    STATUT_CHOICES = [
        ('ouverte', 'Ouverte'),
        ('complete', 'Complète'),
        ('terminee', 'Terminée'),
        ('annulee', 'Annulée'),
    ]

    formation = models.ForeignKey(Formation, on_delete=models.CASCADE, related_name='sessions')
    date_debut = models.DateField()
    date_fin = models.DateField()
    format = models.CharField(max_length=20, choices=FORMAT_CHOICES)
    places_max = models.PositiveSmallIntegerField()
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='ouverte')

    class Meta:
        ordering = ['date_debut']
        verbose_name = 'Session'
        verbose_name_plural = 'Sessions'
        indexes = [models.Index(fields=['date_debut'])]

    def __str__(self):
        return f'{self.formation.titre} — {self.date_debut}'

    def refresh_statut(self):
        confirmed = self.inscriptions.filter(statut__in=['confirmee', 'payee']).count()
        if confirmed >= self.places_max and self.statut == 'ouverte':
            self.statut = 'complete'
            self.save(update_fields=['statut'])


class Inscription(models.Model):
    FORMULE_CHOICES = [
        ('individuel', 'Individuel'),
        ('intra', 'Intra-entreprise'),
        ('pack', 'Pack Entreprise'),
    ]
    MODE_PAIEMENT_CHOICES = [
        ('virement', 'Virement bancaire'),
        ('mobile_money', 'Mobile Money'),
        ('especes', 'Espèces'),
    ]
    STATUT_CHOICES = [
        ('en_attente', 'En attente'),
        ('confirmee', 'Confirmée'),
        ('payee', 'Payée'),
        ('annulee', 'Annulée'),
    ]

    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='inscriptions')
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='inscriptions')
    formule = models.CharField(max_length=20, choices=FORMULE_CHOICES)
    mode_paiement = models.CharField(max_length=20, choices=MODE_PAIEMENT_CHOICES)
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='en_attente')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Inscription'
        verbose_name_plural = 'Inscriptions'
        unique_together = ('user', 'session')

    def __str__(self):
        return f'{self.user.email} → {self.session}'
