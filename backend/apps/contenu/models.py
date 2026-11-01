from django.db import models

# Textes par défaut de la section hero (aussi utilisés par la migration de données
# et comme valeurs de repli côté frontend).
HERO_DEFAULTS = {
    # Slogan officiel : « We build smart digital futures. »
    'titre_ligne_1': 'We build smart',
    'titre_ligne_2': 'digital futures.',
    'sous_titre': (
        'Votre partenaire IT de confiance à Conakry. Solutions cloud, cybersécurité, '
        'développement logiciel et centre de formation certifiant.'
    ),
    'bouton_principal_texte': 'Demander un devis',
    'bouton_secondaire_texte': 'Nos formations',
}


class ContenuAccueil(models.Model):
    """Contenu éditable de la page d'accueil. Singleton : une seule ligne (pk=1)."""

    SINGLETON_PK = 1

    titre_ligne_1 = models.CharField(
        'Titre — ligne 1', max_length=120, default=HERO_DEFAULTS['titre_ligne_1'],
        help_text='Affichée en blanc.',
    )
    titre_ligne_2 = models.CharField(
        'Titre — ligne 2', max_length=120, default=HERO_DEFAULTS['titre_ligne_2'],
        help_text='Affichée en vert.',
    )
    sous_titre = models.TextField('Sous-titre', default=HERO_DEFAULTS['sous_titre'])
    bouton_principal_texte = models.CharField(
        'Texte du bouton principal', max_length=60,
        default=HERO_DEFAULTS['bouton_principal_texte'],
        help_text='Bouton vers la demande de devis.',
    )
    bouton_secondaire_texte = models.CharField(
        'Texte du bouton secondaire', max_length=60,
        default=HERO_DEFAULTS['bouton_secondaire_texte'],
        help_text='Bouton vers le catalogue des formations.',
    )
    updated_at = models.DateTimeField('Dernière modification', auto_now=True)

    class Meta:
        verbose_name = "Contenu de la page d'accueil"
        verbose_name_plural = "Contenu de la page d'accueil"

    def __str__(self):
        return "Contenu de la page d'accueil"

    def save(self, *args, **kwargs):
        self.pk = self.SINGLETON_PK
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Le singleton ne doit jamais disparaître
        return 0, {}

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=cls.SINGLETON_PK)
        return obj
