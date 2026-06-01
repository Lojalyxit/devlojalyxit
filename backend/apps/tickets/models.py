from django.db import models


class Ticket(models.Model):
    PRIORITE_CHOICES = [
        ('critique', 'Critique'),
        ('haute', 'Haute'),
        ('normale', 'Normale'),
        ('faible', 'Faible'),
    ]
    STATUT_CHOICES = [
        ('ouvert', 'Ouvert'),
        ('en_cours', 'En cours'),
        ('resolu', 'Résolu'),
        ('ferme', 'Fermé'),
    ]
    # Délais SLA : {réponse en heures, résolution en heures}
    SLA_HEURES = {
        'critique':     {'reponse': 1,  'resolution': 4},
        'haute':        {'reponse': 2,  'resolution': 8},
        'normale':      {'reponse': 4,  'resolution': 24},
        'faible':       {'reponse': 8,  'resolution': 120},
    }

    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='tickets')
    contrat = models.ForeignKey(
        'contrats.Contrat', on_delete=models.SET_NULL,
        null=True, blank=True, related_name='tickets'
    )
    sujet = models.CharField(max_length=300)
    description = models.TextField()
    priorite = models.CharField(max_length=20, choices=PRIORITE_CHOICES, default='normale')
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='ouvert')
    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Ticket'
        verbose_name_plural = 'Tickets'
        indexes = [models.Index(fields=['statut'])]

    def __str__(self):
        return f'#{self.pk} — {self.sujet}'

    @property
    def sla(self):
        return self.SLA_HEURES.get(self.priorite, {})
