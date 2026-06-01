"""
Commande de seed : python manage.py seed
Crée 7 services et 8 formations avec sessions de démonstration.
"""
import datetime
from django.core.management.base import BaseCommand
from django.utils.text import slugify

from apps.services.models import Service
from apps.formations.models import Formation, Session


SERVICES = [
    {
        'slug': 'serveurs-cloud',
        'titre': 'Serveurs & Cloud',
        'description': (
            'Déploiement, migration et administration de serveurs physiques et virtuels. '
            'Solutions cloud hybride (AWS, Azure, GCP), sauvegarde et disaster recovery.'
        ),
        'icone': 'server',
        'ordre': 1,
    },
    {
        'slug': 'developpement-logiciel',
        'titre': 'Développement Logiciel',
        'description': (
            'Conception et développement d\'applications web, mobiles et logiciels métier '
            'sur mesure. APIs, intégrations et automatisation de processus.'
        ),
        'icone': 'code',
        'ordre': 2,
    },
    {
        'slug': 'reseau-infrastructure',
        'titre': 'Réseau & Infrastructure',
        'description': (
            'Conception, déploiement et maintenance de réseaux d\'entreprise (LAN, WAN, Wi-Fi). '
            'Équipements Cisco, firewalls, VPN et surveillance de réseau.'
        ),
        'icone': 'network',
        'ordre': 3,
    },
    {
        'slug': 'marketing-digital',
        'titre': 'Marketing Digital',
        'description': (
            'Stratégie digitale, référencement naturel (SEO), gestion des réseaux sociaux, '
            'campagnes publicitaires et création de contenu pour le marché ouest-africain.'
        ),
        'icone': 'trending-up',
        'ordre': 4,
    },
    {
        'slug': 'maintenance-informatique',
        'titre': 'Maintenance Informatique',
        'description': (
            'Contrats de maintenance préventive et corrective, support utilisateurs, '
            'infogérance de parc informatique et helpdesk (SLA garantis).'
        ),
        'icone': 'tool',
        'ordre': 5,
    },
    {
        'slug': 'vente-equipements',
        'titre': 'Vente d\'Équipements',
        'description': (
            'Fourniture d\'équipements informatiques professionnels : postes de travail, '
            'serveurs, équipements réseau Cisco, onduleurs et accessoires bureautiques.'
        ),
        'icone': 'shopping-bag',
        'ordre': 6,
    },
    {
        'slug': 'centre-formation',
        'titre': 'Centre de Formation Certifiant',
        'description': (
            'Formations certifiantes en réseaux (CCNA, CCNP), cybersécurité (CEH), '
            'systèmes et développement. Formats présentiel, en ligne et intra-entreprise.'
        ),
        'icone': 'graduation-cap',
        'ordre': 7,
    },
]

FORMATIONS = [
    {
        'slug': 'ccna',
        'titre': 'CCNA — Cisco Certified Network Associate',
        'domaine': 'Réseaux',
        'duree_heures': 40,
        'niveau': 'intermediaire',
        'programme': (
            'Module 1 : Fondamentaux des réseaux et modèle OSI\n'
            'Module 2 : Protocoles IP, routage statique et dynamique (OSPF, EIGRP)\n'
            'Module 3 : Commutation, VLANs et spanning tree\n'
            'Module 4 : WAN, VPN et sécurité réseau de base\n'
            'Module 5 : Automatisation et gestion des réseaux\n'
            'Module 6 : Préparation à l\'examen CCNA 200-301'
        ),
        'tarif_min_gnf': 1500000,
        'tarif_max_gnf': 2500000,
    },
    {
        'slug': 'ccnp-enterprise',
        'titre': 'CCNP Enterprise',
        'domaine': 'Réseaux',
        'duree_heures': 60,
        'niveau': 'avance',
        'programme': (
            'Module 1 : Architecture d\'entreprise avancée\n'
            'Module 2 : Routage avancé (BGP, MPLS, SD-WAN)\n'
            'Module 3 : Infrastructure sans fil d\'entreprise\n'
            'Module 4 : Sécurité réseau avancée\n'
            'Module 5 : Automatisation et programmabilité réseau\n'
            'Module 6 : Préparation aux examens ENCOR et ENARSI'
        ),
        'tarif_min_gnf': 2500000,
        'tarif_max_gnf': 4000000,
    },
    {
        'slug': 'ceh-v13',
        'titre': 'CEH v13 — Certified Ethical Hacker',
        'domaine': 'Cybersécurité',
        'duree_heures': 40,
        'niveau': 'intermediaire',
        'programme': (
            'Module 1 : Introduction à l\'ethical hacking et méthodologies\n'
            'Module 2 : Reconnaissance et collecte d\'informations\n'
            'Module 3 : Scan de réseaux et énumération\n'
            'Module 4 : Exploitation de vulnérabilités et post-exploitation\n'
            'Module 5 : Sécurité des applications web et API\n'
            'Module 6 : Rapports de tests d\'intrusion et préparation CEH'
        ),
        'tarif_min_gnf': 2000000,
        'tarif_max_gnf': 3500000,
    },
    {
        'slug': 'python-data-science',
        'titre': 'Python pour la Data Science',
        'domaine': 'Développement',
        'duree_heures': 30,
        'niveau': 'intermediaire',
        'programme': (
            'Module 1 : Python fondamentaux (syntaxe, structures, OOP)\n'
            'Module 2 : NumPy et Pandas — manipulation de données\n'
            'Module 3 : Visualisation avec Matplotlib et Seaborn\n'
            'Module 4 : Machine learning avec Scikit-learn\n'
            'Module 5 : Projet fil rouge — analyse de données réelles'
        ),
        'tarif_min_gnf': 1200000,
        'tarif_max_gnf': 2000000,
    },
    {
        'slug': 'windows-server-2022',
        'titre': 'Windows Server 2022 — Administration',
        'domaine': 'Systèmes',
        'duree_heures': 35,
        'niveau': 'intermediaire',
        'programme': (
            'Module 1 : Installation et configuration de Windows Server 2022\n'
            'Module 2 : Active Directory, DNS, DHCP\n'
            'Module 3 : Hyper-V et virtualisation\n'
            'Module 4 : Storage Spaces et sauvegarde\n'
            'Module 5 : Sécurité Windows Server et Group Policy\n'
            'Module 6 : Préparation examen AZ-800'
        ),
        'tarif_min_gnf': 1400000,
        'tarif_max_gnf': 2200000,
    },
    {
        'slug': 'cybersecurite-fondamentaux',
        'titre': 'Cybersécurité — Fondamentaux',
        'domaine': 'Cybersécurité',
        'duree_heures': 25,
        'niveau': 'debutant',
        'programme': (
            'Module 1 : Panorama des menaces cyber (malwares, phishing, ransomware)\n'
            'Module 2 : Politiques de sécurité et bonnes pratiques\n'
            'Module 3 : Sécurisation des postes de travail et mots de passe\n'
            'Module 4 : Bases du RGPD et conformité données\n'
            'Module 5 : Plan de réponse aux incidents'
        ),
        'tarif_min_gnf': 800000,
        'tarif_max_gnf': 1500000,
    },
    {
        'slug': 'devops-cloud-aws',
        'titre': 'DevOps & Cloud AWS',
        'domaine': 'Cloud',
        'duree_heures': 45,
        'niveau': 'avance',
        'programme': (
            'Module 1 : Culture DevOps et CI/CD\n'
            'Module 2 : Conteneurisation Docker et orchestration Kubernetes\n'
            'Module 3 : Infrastructure as Code avec Terraform\n'
            'Module 4 : Services AWS (EC2, S3, RDS, Lambda)\n'
            'Module 5 : Monitoring, logging et alerting (CloudWatch, Grafana)\n'
            'Module 6 : Sécurité cloud et préparation AWS SAA-C03'
        ),
        'tarif_min_gnf': 2500000,
        'tarif_max_gnf': 4500000,
    },
    {
        'slug': 'marketing-digital-reseaux-sociaux',
        'titre': 'Marketing Digital & Réseaux Sociaux',
        'domaine': 'Marketing',
        'duree_heures': 20,
        'niveau': 'tous',
        'programme': (
            'Module 1 : Stratégie de présence digitale\n'
            'Module 2 : Création de contenu et storytelling pour l\'Afrique de l\'Ouest\n'
            'Module 3 : Gestion des réseaux sociaux (Facebook, Instagram, LinkedIn, TikTok)\n'
            'Module 4 : SEO et référencement local\n'
            'Module 5 : Publicité digitale (Meta Ads, Google Ads) et analytics'
        ),
        'tarif_min_gnf': 700000,
        'tarif_max_gnf': 1200000,
    },
]


class Command(BaseCommand):
    help = 'Charge les données de démonstration (7 services, 8 formations avec sessions)'

    def add_arguments(self, parser):
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Supprime et recrée toutes les données de seed',
        )

    def handle(self, *args, **options):
        if options['reset']:
            Service.objects.all().delete()
            Formation.objects.all().delete()
            self.stdout.write(self.style.WARNING('Données existantes supprimées.'))

        self._seed_services()
        self._seed_formations()
        self.stdout.write(self.style.SUCCESS('Seed terminé avec succès.'))

    def _seed_services(self):
        created = 0
        for data in SERVICES:
            _, is_new = Service.objects.get_or_create(slug=data['slug'], defaults=data)
            if is_new:
                created += 1
        self.stdout.write(f'  Services : {created} créés ({len(SERVICES)} total)')

    def _seed_formations(self):
        today = datetime.date.today()
        created = 0
        for data in FORMATIONS:
            formation, is_new = Formation.objects.get_or_create(
                slug=data['slug'], defaults=data
            )
            if is_new:
                created += 1
                # Session présentielle dans ~30 jours
                debut = today + datetime.timedelta(days=30)
                Session.objects.create(
                    formation=formation,
                    date_debut=debut,
                    date_fin=debut + datetime.timedelta(days=data['duree_heures'] // 8),
                    format='presentiel',
                    places_max=15,
                    statut='ouverte',
                )
                # Session en ligne dans ~60 jours
                debut2 = today + datetime.timedelta(days=60)
                Session.objects.create(
                    formation=formation,
                    date_debut=debut2,
                    date_fin=debut2 + datetime.timedelta(days=data['duree_heures'] // 8),
                    format='en_ligne',
                    places_max=30,
                    statut='ouverte',
                )
        self.stdout.write(f'  Formations : {created} créées ({len(FORMATIONS)} total)')
