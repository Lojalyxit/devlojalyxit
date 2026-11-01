from django.db import migrations

# Organisme qui délivre la certification officielle, par formation (slug).
# Les formations sans certification d'éditeur (IA & Automatisation, Marketing) ne sont pas listées.
ORGANISMES = {
    'ccna': 'Cisco',
    'ccnp-enterprise': 'Cisco',
    'ceh-v13': 'EC-Council',
    'cybersecurite-fondamentaux': 'CompTIA ou EC-Council',
    'linux-rhcsa-rh124': 'Red Hat',
    'windows-server-2022': 'Microsoft',
    'firewall-fortigate': 'Fortinet',
    'devops-cloud-aws': 'Amazon Web Services (AWS)',
    'python-pcep': 'Python Institute (OpenEDG)',
}


def remplir(apps, schema_editor):
    Formation = apps.get_model('formations', 'Formation')
    for slug, organisme in ORGANISMES.items():
        # Ne remplace pas une valeur déjà saisie dans l'admin
        Formation.objects.filter(slug=slug, organisme_certification__isnull=True).update(
            organisme_certification=organisme
        )


class Migration(migrations.Migration):

    dependencies = [
        ('formations', '0003_organisme_certification'),
    ]

    operations = [
        migrations.RunPython(remplir, migrations.RunPython.noop),
    ]
