from django.db import migrations

# Textes figés ici (et non importés du modèle) pour que la migration reste stable
# même si les valeurs par défaut du modèle changent plus tard.
TEXTES_HERO = {
    'titre_ligne_1': 'We Build Smart',
    'titre_ligne_2': 'Digital Futures !!',
    'sous_titre': (
        'Votre partenaire IT de confiance à Conakry. Solutions cloud, cybersécurité, '
        'développement logiciel et centre de formation certifiant.'
    ),
    'bouton_principal_texte': 'Demander un devis',
    'bouton_secondaire_texte': 'Nos formations',
}


def creer_contenu_accueil(apps, schema_editor):
    ContenuAccueil = apps.get_model('contenu', 'ContenuAccueil')
    # Ne remplace pas un contenu déjà saisi dans l'admin
    ContenuAccueil.objects.get_or_create(pk=1, defaults=TEXTES_HERO)


def supprimer_contenu_accueil(apps, schema_editor):
    ContenuAccueil = apps.get_model('contenu', 'ContenuAccueil')
    ContenuAccueil.objects.filter(pk=1).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('contenu', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(creer_contenu_accueil, supprimer_contenu_accueil),
    ]
