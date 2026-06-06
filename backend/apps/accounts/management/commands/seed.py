"""
Commande de seed : python manage.py seed
Crée 7 services et les formations avec sessions et modules de démonstration.
"""
import datetime
from django.core.management.base import BaseCommand

from apps.services.models import Service
from apps.formations.models import Formation, FormationModule, Session


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
            "Conception et développement d'applications web, mobiles et logiciels métier "
            'sur mesure. APIs, intégrations et automatisation de processus.'
        ),
        'icone': 'code',
        'ordre': 2,
    },
    {
        'slug': 'reseau-infrastructure',
        'titre': 'Réseau & Infrastructure',
        'description': (
            "Conception, déploiement et maintenance de réseaux d'entreprise (LAN, WAN, Wi-Fi). "
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
        'titre': "Vente d'Équipements",
        'description': (
            "Fourniture d'équipements informatiques professionnels : postes de travail, "
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
    # ─── 1. CCNA ──────────────────────────────────────────────────────────────
    {
        'slug': 'ccna',
        'titre': 'CCNA — Cisco Certified Network Associate',
        'domaine': 'Réseaux',
        'duree_heures': 40,
        'niveau': 'intermediaire',
        'programme': (
            'Module 1 : Fondamentaux des réseaux et modèle OSI\n'
            'Module 2 : Accès réseau et switching\n'
            'Module 3 : Connectivité IP et routage\n'
            'Module 4 : Services IP\n'
            'Module 5 : Fondamentaux de sécurité\n'
            'Module 6 : Automatisation et programmabilité\n'
            "Module 7 : Préparation examen et labs Packet Tracer"
        ),
        'description_longue': (
            'Formation préparant à la certification Cisco CCNA 200-301, standard mondial '
            "pour les administrateurs réseau. Couvre les fondamentaux du routage, du switching, "
            "de la sécurité réseau et de l'automatisation. À l'issue de la formation, les "
            "participants sont en mesure de concevoir, configurer et dépanner des réseaux "
            "d'entreprise de taille moyenne et de passer l'examen Cisco 200-301 CCNA."
        ),
        'certification': 'Cisco 200-301 CCNA (officielle)',
        'tarif_min_gnf': 1500000,
        'tarif_max_gnf': 2500000,
        'modules': [
            {
                'titre': 'Fondamentaux des réseaux',
                'ordre': 1,
                'duree_heures': 5,
                'objectifs': (
                    "Comprendre les modèles de référence OSI et TCP/IP\n"
                    "Maîtriser l'adressage IPv4 et IPv6 et le subnetting\n"
                    "Identifier les équipements réseau et leurs fonctions"
                ),
                'contenu': (
                    "Modèle OSI et TCP/IP : couches, encapsulation, PDU\n"
                    "Équipements réseau : switch, routeur, firewall, AP\n"
                    "Types de connexions et topologies réseau\n"
                    "Adressage IPv4 : classes, notation CIDR, calcul de sous-réseaux\n"
                    "Introduction à IPv6 : format, types d'adresses, EUI-64\n"
                    "Subnetting avancé et VLSM"
                ),
            },
            {
                'titre': 'Accès réseau et switching',
                'ordre': 2,
                'duree_heures': 7,
                'objectifs': (
                    "Configurer des VLANs et le trunking 802.1Q\n"
                    "Comprendre et configurer le Spanning Tree Protocol\n"
                    "Sécuriser les ports d'un switch Cisco"
                ),
                'contenu': (
                    "Ethernet : trames, adresses MAC, collisions et domaines\n"
                    "VLANs : création, assignation de ports, VLAN data/voix/natif\n"
                    "Trunking 802.1Q et protocole DTP\n"
                    "EtherChannel (LACP, PAgP) : configuration et vérification\n"
                    "Spanning Tree Protocol : STP, RSTP, PortFast, BPDUGuard\n"
                    "Sécurité des ports : port-security, DHCP snooping, DAI"
                ),
            },
            {
                'titre': 'Connectivité IP et routage',
                'ordre': 3,
                'duree_heures': 8,
                'objectifs': (
                    "Configurer le routage statique et dynamique OSPF\n"
                    "Analyser et dépanner une table de routage\n"
                    "Implémenter la redondance de passerelle (HSRP/VRRP)"
                ),
                'contenu': (
                    "Routage statique : routes host, réseaux, par défaut, flottantes\n"
                    "OSPF mono-zone : LSA, DR/BDR, métrique cost, authentification\n"
                    "FHRP : HSRP, VRRP — configuration et bascule\n"
                    "Table de routage : lecture, métriques, distance administrative\n"
                    "Troubleshooting : ping, traceroute, debug ip routing\n"
                    "Routage inter-VLAN (Router-on-a-stick, SVI)"
                ),
            },
            {
                'titre': 'Services IP',
                'ordre': 4,
                'duree_heures': 6,
                'objectifs': (
                    "Configurer DHCP, DNS et NAT/PAT sur un routeur Cisco\n"
                    "Comprendre les services de gestion réseau (NTP, SNMP, Syslog)\n"
                    "Appliquer les principes de base de la QoS"
                ),
                'contenu': (
                    "DHCP : pool, exclusions, options, relay agent\n"
                    "DNS : résolution, types d'enregistrements, hiérarchie\n"
                    "NAT statique, dynamique et PAT (overload)\n"
                    "NTP : stratum, synchronisation, authentification\n"
                    "SNMP v2c/v3 : MIB, OID, traps\n"
                    "Syslog : niveaux de sévérité, configuration\n"
                    "QoS : classification, marquage DSCP, file d'attente"
                ),
            },
            {
                'titre': 'Fondamentaux de sécurité',
                'ordre': 5,
                'duree_heures': 6,
                'objectifs': (
                    "Créer et appliquer des ACLs standards et étendues\n"
                    "Comprendre les principes de l'AAA et des VPN\n"
                    "Sécuriser l'infrastructure de couche 2"
                ),
                'contenu': (
                    "ACL standards : critères, placement, numérotées vs nommées\n"
                    "ACL étendues : protocoles, ports, opérateurs\n"
                    "Sécurité couche 2 : VLAN hopping, STP attacks, mitigation\n"
                    "AAA : authentification locale, RADIUS basique\n"
                    "Concepts VPN : site-à-site, accès distant, IPsec\n"
                    "Principes cybersécurité : CIA triad, menaces, vulnérabilités\n"
                    "Durcissement des équipements Cisco (SSH, bannières, privilege levels)"
                ),
            },
            {
                'titre': 'Automatisation et programmabilité',
                'ordre': 6,
                'duree_heures': 4,
                'objectifs': (
                    "Comprendre les concepts SDN et l'automatisation réseau\n"
                    "Utiliser les API REST pour interagir avec des équipements\n"
                    "Écrire des scripts Python basiques pour la gestion réseau"
                ),
                'contenu': (
                    "Introduction au SDN : plan de contrôle vs plan de données\n"
                    "API REST : méthodes HTTP, JSON, Postman\n"
                    "Python pour les réseaux : bibliothèques Netmiko, Paramiko\n"
                    "Ansible : playbooks, modules ios_command, ios_config\n"
                    "Formats de données : JSON, XML, YANG\n"
                    "Cisco DNA Center : interface et automatisation basique"
                ),
            },
            {
                'titre': 'Préparation examen et labs Packet Tracer',
                'ordre': 7,
                'duree_heures': 4,
                'objectifs': (
                    "Consolider les acquis via des labs intensifs Packet Tracer\n"
                    "Maîtriser la méthodologie de troubleshooting CCNA\n"
                    "Se préparer aux types de questions de l'examen 200-301"
                ),
                'contenu': (
                    "Labs complets : configuration end-to-end d'un réseau d'entreprise\n"
                    "Simulations d'examen : QCM, drag-and-drop, scénarios\n"
                    "Méthodologie troubleshooting systématique\n"
                    "Révisions ciblées des points faibles\n"
                    "Conseils pratiques pour le jour de l'examen Cisco"
                ),
            },
        ],
    },

    # ─── 2. CCNP Enterprise ───────────────────────────────────────────────────
    {
        'slug': 'ccnp-enterprise',
        'titre': 'CCNP Enterprise',
        'domaine': 'Réseaux',
        'duree_heures': 60,
        'niveau': 'avance',
        'programme': (
            "Module 1 : Architecture réseau d'entreprise\n"
            'Module 2 : Routage avancé\n'
            'Module 3 : Infrastructure WAN et VPN\n'
            'Module 4 : Services IP avancés\n'
            "Module 5 : Sécurité de l'infrastructure\n"
            'Module 6 : Automatisation réseau\n'
            'Module 7 : Wi-Fi entreprise et préparation examens'
        ),
        'description_longue': (
            "Formation avancée pour ingénieurs réseau confirmés, préparant aux examens "
            "Cisco CCNP Enterprise (ENCOR 350-401 + ENARSI 300-410). Approfondit le routage "
            "avancé (BGP, OSPF multi-zone, EIGRP), l'architecture réseau d'entreprise, la "
            "sécurité et l'automatisation à grande échelle. Prérequis : certification CCNA "
            "ou expérience équivalente."
        ),
        'certification': 'Cisco CCNP Enterprise (ENCOR 350-401 + ENARSI 300-410)',
        'tarif_min_gnf': 2500000,
        'tarif_max_gnf': 4000000,
        'modules': [
            {
                'titre': "Architecture réseau d'entreprise",
                'ordre': 1,
                'duree_heures': 8,
                'objectifs': (
                    "Concevoir une architecture réseau hiérarchique à trois couches\n"
                    "Comprendre les modèles SD-WAN et la virtualisation réseau\n"
                    "Maîtriser les topologies campus et WAN d'entreprise"
                ),
                'contenu': (
                    "Design hiérarchique : core, distribution, access\n"
                    "Architecture campus : haute disponibilité, redondance\n"
                    "WAN d'entreprise : MPLS, Metro Ethernet, DWDM\n"
                    "SD-WAN : vEdge, vSmart, vManage, vBond\n"
                    "Virtualisation réseau : VRF, VRF-Lite, MPLS VPN\n"
                    "Cisco DNA Architecture : fabric, overlay, underlay"
                ),
            },
            {
                'titre': 'Routage avancé',
                'ordre': 2,
                'duree_heures': 12,
                'objectifs': (
                    "Configurer OSPF multi-zone et EIGRP en environnement complexe\n"
                    "Implémenter BGP pour la connectivité Internet et MPLS\n"
                    "Maîtriser la redistribution de routes et les route maps"
                ),
                'contenu': (
                    "OSPF multi-zone : types de zones, LSA 1-7, virtual links\n"
                    "OSPF stub, totally stubby, NSSA\n"
                    "EIGRP avancé : DUAL, successeurs, feasibility condition, named mode\n"
                    "BGP : eBGP, iBGP, attributs (AS-path, MED, local-pref, weight)\n"
                    "BGP route manipulation : filtres, prefix-list, route-map\n"
                    "Redistribution : métriques, tags, filtres pour éviter les boucles\n"
                    "Policy-based routing (PBR) et route maps"
                ),
            },
            {
                'titre': 'Infrastructure WAN et VPN',
                'ordre': 3,
                'duree_heures': 8,
                'objectifs': (
                    "Configurer DMVPN en phases 1, 2 et 3\n"
                    "Implémenter IPsec VPN site-à-site et FlexVPN\n"
                    "Comprendre MPLS L3VPN et les tunnels GRE"
                ),
                'contenu': (
                    "MPLS : label switching, LDP, LSP\n"
                    "MPLS L3VPN : PE, CE, RD, RT, VPNv4\n"
                    "DMVPN : NHRP, mGRE, phases 1/2/3\n"
                    "IPsec : IKEv1/IKEv2, transforms, crypto maps, VTI\n"
                    "FlexVPN : profils IKEv2, virtual templates\n"
                    "GRE : tunnels, récursivité, recursive routing\n"
                    "SD-WAN vs DMVPN : cas d'usage et migration"
                ),
            },
            {
                'titre': 'Services IP avancés',
                'ordre': 4,
                'duree_heures': 8,
                'objectifs': (
                    "Configurer la QoS avancée avec MQC\n"
                    "Comprendre le multicast IP (PIM, IGMP)\n"
                    "Utiliser IP SLA et NetFlow pour la supervision"
                ),
                'contenu': (
                    "QoS : classification MQC, DSCP/CoS, policing, shaping, CBWFQ, LLQ\n"
                    "Multicast : IGMP v1/v2/v3, PIM sparse/dense/SSM\n"
                    "IPv6 en profondeur : DHCPv6, RA, NDP, tunnels 6to4\n"
                    "NetFlow : exports v5/v9/IPFIX, analyseurs\n"
                    "IP SLA : probes ICMP, UDP, jitter, tracking\n"
                    "Embedded Event Manager (EEM) : scripts TCL/Python\n"
                    "BFD : détection de défaillance rapide"
                ),
            },
            {
                'titre': "Sécurité de l'infrastructure",
                'ordre': 5,
                'duree_heures': 8,
                'objectifs': (
                    "Implémenter le Control Plane Policing (CoPP)\n"
                    "Sécuriser les protocoles de routage (authentification MD5/SHA)\n"
                    "Configurer AAA avec TACACS+ et RADIUS"
                ),
                'contenu': (
                    "Control Plane Policing (CoPP) : classification, politique\n"
                    "Sécurité OSPF/BGP : authentification MD5 et SHA-256\n"
                    "AAA : TACACS+ pour l'administration, RADIUS pour l'accès\n"
                    "802.1X : authentificateur, serveur RADIUS, profils\n"
                    "Durcissement IOS-XE : privilege levels, views, parser\n"
                    "Cisco TrustSec : SGT, SGACL\n"
                    "Analyse des logs et corrélation d'événements"
                ),
            },
            {
                'titre': 'Automatisation réseau',
                'ordre': 6,
                'duree_heures': 8,
                'objectifs': (
                    "Utiliser NETCONF/YANG pour la configuration programmatique\n"
                    "Automatiser avec Ansible et Cisco DNA Center\n"
                    "Écrire des scripts Python avancés pour les réseaux"
                ),
                'contenu': (
                    "Python avancé : classes, décorateurs, gestion d'erreurs réseau\n"
                    "NETCONF : opérations get-config, edit-config, ncclient\n"
                    "YANG : modèles Cisco-IOS-XE, pyang, validation\n"
                    "RESTCONF : API HTTP sur YANG, Postman\n"
                    "Ansible avancé : rôles, variables, conditions, handlers\n"
                    "Cisco DNA Center : API, templates, compliance\n"
                    "Gestion de configuration : Git, diff, rollback"
                ),
            },
            {
                'titre': 'Wi-Fi entreprise et préparation examens',
                'ordre': 7,
                'duree_heures': 8,
                'objectifs': (
                    "Concevoir et configurer un réseau WLAN d'entreprise\n"
                    "Implémenter la sécurité 802.1X sur les réseaux sans fil\n"
                    "Se préparer efficacement aux examens ENCOR et ENARSI"
                ),
                'contenu': (
                    "Architectures WLAN : autonome, centralisée (WLC), Cisco DNA\n"
                    "Configuration WLC : WLAN, AP groups, RF profiles\n"
                    "Sécurité WLAN : WPA3, 802.1X, EAP-TLS, profils AAA\n"
                    "Troubleshooting WLAN : outils, captures, RF analysis\n"
                    "Labs ENCOR : BGP, OSPF, SD-WAN, QoS, Python\n"
                    "Labs ENARSI : routage avancé, VPN, infrastructure\n"
                    "Simulations d'examen et méthodologie de révision"
                ),
            },
        ],
    },

    # ─── 3. CEH v13 ───────────────────────────────────────────────────────────
    {
        'slug': 'ceh-v13',
        'titre': 'CEH v13 — Certified Ethical Hacker',
        'domaine': 'Cybersécurité',
        'duree_heures': 40,
        'niveau': 'intermediaire',
        'programme': (
            "Module 1 : Introduction au hacking éthique\n"
            'Module 2 : Reconnaissance et footprinting\n'
            'Module 3 : Scan et énumération\n'
            'Module 4 : Hacking système et malwares\n'
            'Module 5 : Sniffing et ingénierie sociale\n'
            'Module 6 : Hacking applications web et mobiles\n'
            'Module 7 : Hacking réseaux sans fil et IoT\n'
            'Module 8 : Cloud computing et cryptographie\n'
            "Module 9 : Labs offensifs et préparation examen"
        ),
        'description_longue': (
            "Formation officielle EC-Council CEH v13, intégrant l'intelligence artificielle "
            "dans le hacking éthique. Prépare aux tests d'intrusion offensifs et défensifs, "
            "conformément aux standards internationaux. Les participants apprennent à penser "
            "comme un attaquant pour mieux défendre les systèmes d'information. Certification "
            "reconnue mondialement par les RSSI, DSI et équipes Blue/Red Team."
        ),
        'certification': 'EC-Council CEH v13 (Certified Ethical Hacker)',
        'tarif_min_gnf': 2000000,
        'tarif_max_gnf': 3500000,
        'modules': [
            {
                'titre': 'Introduction au hacking éthique',
                'ordre': 1,
                'duree_heures': 3,
                'objectifs': (
                    "Comprendre le cadre légal et éthique du hacking\n"
                    "Maîtriser les méthodologies de test d'intrusion\n"
                    "Saisir le rôle de l'IA dans la cybersécurité offensive"
                ),
                'contenu': (
                    "Concepts fondamentaux : hackers, types d'attaques, vecteurs\n"
                    "Cadre légal : lois cybersécurité, contrats de prestation, consentement\n"
                    "Méthodologies : PTES, OWASP Testing Guide, MITRE ATT&CK\n"
                    "Cyber Kill Chain : reconnaissance à exfiltration\n"
                    "IA en cybersécurité : génération de payloads, détection d'anomalies\n"
                    "Environnement de lab : Kali Linux, VMs, réseau isolé"
                ),
            },
            {
                'titre': 'Reconnaissance et footprinting',
                'ordre': 2,
                'duree_heures': 4,
                'objectifs': (
                    "Effectuer une collecte passive d'informations (OSINT)\n"
                    "Utiliser les outils professionnels de reconnaissance\n"
                    "Cartographier l'infrastructure d'une cible"
                ),
                'contenu': (
                    "OSINT : sources ouvertes, réseaux sociaux, WHOIS, DNS\n"
                    "Google Dorking : opérateurs avancés, Google Hacking Database\n"
                    "Shodan / Censys : recherche d'équipements exposés\n"
                    "Maltego : graphes de relations, transformations\n"
                    "Recon-ng : modules OSINT automatisés\n"
                    "theHarvester, Spiderfoot : collecte email et domaines\n"
                    "Footprinting web : technologies, CMS, certificats SSL"
                ),
            },
            {
                'titre': 'Scan et énumération',
                'ordre': 3,
                'duree_heures': 4,
                'objectifs': (
                    "Réaliser des scans de ports et de vulnérabilités\n"
                    "Énumérer les services réseau (SMB, SNMP, LDAP)\n"
                    "Utiliser les techniques de scan assistées par IA"
                ),
                'contenu': (
                    "Nmap avancé : types de scan, scripts NSE, timing, évasion\n"
                    "Masscan : scan rapide de grands réseaux\n"
                    "Scanners de vulnérabilités : Nessus, OpenVAS\n"
                    "Énumération SMB : enum4linux, smbclient, null sessions\n"
                    "Énumération SNMP : snmpwalk, community strings\n"
                    "Énumération LDAP : ldapsearch, BloodHound basique\n"
                    "AI-assisted scanning : corrélation automatique des résultats"
                ),
            },
            {
                'titre': 'Hacking système et malwares',
                'ordre': 4,
                'duree_heures': 5,
                'objectifs': (
                    "Comprendre les techniques d'exploitation et d'élévation de privilèges\n"
                    "Analyser le comportement des malwares\n"
                    "Mettre en place des mécanismes de persistance"
                ),
                'contenu': (
                    "Exploitation : Metasploit Framework, msfvenom, exploit/payload\n"
                    "Élévation de privilèges Windows : tokens, UAC bypass, misconfigs\n"
                    "Élévation de privilèges Linux : SUID, capabilities, sudo\n"
                    "Persistance : cron, services, registre Windows, rootkits\n"
                    "Types de malwares : virus, vers, trojans, ransomware, RAT\n"
                    "Analyse comportementale : sandbox, IOC, YARA rules\n"
                    "Techniques d'évasion : obfuscation, polymorphisme"
                ),
            },
            {
                'titre': 'Sniffing et ingénierie sociale',
                'ordre': 5,
                'duree_heures': 4,
                'objectifs': (
                    "Capturer et analyser le trafic réseau avec Wireshark\n"
                    "Mener des attaques Man-in-the-Middle\n"
                    "Concevoir des campagnes de phishing réalistes"
                ),
                'contenu': (
                    "Wireshark : filtres, suivi de flux, extraction de credentials\n"
                    "ARP poisoning : Ettercap, Bettercap, mitigation\n"
                    "Attaques MITM : SSL stripping, SSLsplit, HSTS bypass\n"
                    "Phishing : GoPhish, templates, landing pages\n"
                    "AI deepfakes : clonage de voix, vidéos synthétiques\n"
                    "Social Engineering Toolkit (SET) : vecteurs d'attaque\n"
                    "Contremesures : sensibilisation, SPF/DKIM/DMARC"
                ),
            },
            {
                'titre': 'Hacking applications web et mobiles',
                'ordre': 6,
                'duree_heures': 6,
                'objectifs': (
                    "Exploiter les vulnérabilités OWASP Top 10\n"
                    "Tester la sécurité des API REST et des applications mobiles\n"
                    "Utiliser Burp Suite pour les tests d'intrusion web"
                ),
                'contenu': (
                    "OWASP Top 10 : injection, XSS, IDOR, SSRF, misconfiguration\n"
                    "SQL Injection : manuelle, SQLmap, blind injection\n"
                    "XSS : réfléchi, stocké, DOM-based, CSP bypass\n"
                    "Burp Suite Pro : proxy, scanner, intruder, repeater\n"
                    "Hacking API : fuzzing, authentication bypass, mass assignment\n"
                    "OWASP MASVS : sécurité Android/iOS\n"
                    "Frida : instrumentation dynamique d'applications mobiles"
                ),
            },
            {
                'titre': 'Hacking réseaux sans fil et IoT',
                'ordre': 7,
                'duree_heures': 4,
                'objectifs': (
                    "Comprendre et exploiter les failles des protocoles Wi-Fi\n"
                    "Tester la sécurité des objets connectés (IoT)\n"
                    "Évaluer les risques Bluetooth et RFID"
                ),
                'contenu': (
                    "Wi-Fi attacks : WPA2 handshake capture, hashcat, Aircrack-ng\n"
                    "WPA3 : SAE, dragonfly, attaques connues\n"
                    "Evil Twin / Rogue AP : Hostapd, Karma attack\n"
                    "Bluetooth : BLE sniffing, BlueSnarfing, KNOB attack\n"
                    "RFID/NFC : clonage, replay, Proxmark\n"
                    "Attaques IoT : firmware extraction, UART/JTAG, Shodan IoT\n"
                    "Systèmes embarqués : binwalk, analyse de firmwares"
                ),
            },
            {
                'titre': 'Cloud computing et cryptographie',
                'ordre': 8,
                'duree_heures': 4,
                'objectifs': (
                    "Identifier les vecteurs d'attaque sur AWS et Azure\n"
                    "Tester la sécurité des conteneurs Docker et Kubernetes\n"
                    "Comprendre la cryptographie offensive et défensive"
                ),
                'contenu': (
                    "Sécurité AWS : IAM misconfigurations, S3 buckets exposés, SSRF metadata\n"
                    "Sécurité Azure : Entra ID, Key Vault, storage accounts\n"
                    "Docker : escape de conteneur, images vulnérables, registry\n"
                    "Kubernetes : RBAC, pod security, secrets, Network Policies\n"
                    "Cryptographie offensive : attaques sur implémentations faibles\n"
                    "PKI : certificats, CA, révocation, pinning bypass\n"
                    "Stéganographie et dissimulation de données"
                ),
            },
            {
                'titre': "Labs offensifs et préparation examen",
                'ordre': 9,
                'duree_heures': 6,
                'objectifs': (
                    "Consolider les compétences via les labs iLabs EC-Council\n"
                    "Pratiquer des CTF représentatifs de l'examen CEH\n"
                    "Maîtriser la méthodologie et le format de l'examen"
                ),
                'contenu': (
                    "Labs iLabs EC-Council : 220+ exercices pratiques guidés\n"
                    "CTF orienté CEH : exploitation web, réseau, cryptographie\n"
                    "Rédaction de rapports de pentest professionnels\n"
                    "Révisions ciblées par domaine\n"
                    "Simulations d'examen : 125 QCM, 4 heures\n"
                    "Stratégies de passage de l'examen CEH v13"
                ),
            },
        ],
    },

    # ─── 4. Python PCEP ───────────────────────────────────────────────────────
    {
        'slug': 'python-pcep',
        'titre': 'Python (PCEP) — Programmation pour débutants',
        'domaine': 'Développement',
        'duree_heures': 40,
        'niveau': 'debutant',
        'programme': (
            "Module 1 — Concepts fondamentaux de la programmation et Python (10 h, 17 % de l'examen)\n"
            "Module 2 — Contrôle du flux : conditions et boucles (10 h, 20 % de l'examen)\n"
            "Module 3 — Structures de données : listes, tuples, dictionnaires (12 h, 30 % de l'examen)\n"
            "Module 4 — Fonctions et exceptions (8 h, 33 % de l'examen)\n\n"
            "Méthode pédagogique : cours en petit groupe (8 max), 60 % de pratique, "
            "utilisation de la plateforme officielle EDUBE.org du Python Institute, "
            "examens blancs hebdomadaires PCEP-30-02.\n\n"
            "Évaluation : exercices continus, examens blancs, attestation LojalyxIT. "
            "Accompagnement à l'inscription à l'examen officiel (frais d'examen "
            "~59 USD non inclus, payés directement à OpenEDG)."
        ),
        'description_longue': (
            "Première certification Python reconnue mondialement, accessible sans aucun "
            "pré-requis technique. En 40 heures, vous maîtrisez les fondamentaux de la "
            "programmation Python — variables, types, opérateurs, contrôle du flux, "
            "structures de données, fonctions et gestion d'erreurs — et vous préparez "
            "l'examen officiel PCEP-30-02 du Python Institute.\n\n"
            "À l'issue de la formation, vous serez capable d'écrire et déboguer vos "
            "premiers scripts Python, de manipuler listes, tuples et dictionnaires, "
            "de structurer votre code en fonctions et de gérer les exceptions "
            "proprement. Vous passerez ensuite l'examen officiel PCEP (Pearson VUE / "
            "OpenEDG), première certification Python valable à vie et reconnue par "
            "les recruteurs partout dans le monde.\n\n"
            "Public visé : débutants en programmation (étudiants, professionnels en "
            "reconversion, curieux de l'informatique). Aucun pré-requis : une simple "
            "aisance avec un ordinateur suffit."
        ),
        'certification': 'Python Institute — PCEP™ (Certified Entry-Level Python Programmer, examen PCEP-30-02)',
        'tarif_min_gnf': 1000000,
        'tarif_max_gnf': 1800000,
        'modules': [
            {
                'titre': 'Concepts fondamentaux de Python',
                'ordre': 1,
                'duree_heures': 10,
                'objectifs': (
                    "Comprendre la programmation, installer Python, écrire un "
                    "premier programme, maîtriser littéraux, opérateurs et variables."
                ),
                'contenu': (
                    "- Programmation, langage, compilation vs interprétation\n"
                    "- Installation Python + IDE\n"
                    "- Premier programme : entrées, sorties, commentaires\n"
                    "- Littéraux, types numériques, chaînes\n"
                    "- Opérateurs : arithmétiques, affectation, comparaison, logiques, bit à bit\n"
                    "- Priorité et associativité\n"
                    "- Variables, conversions de types"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'Contrôle du flux : conditions et boucles',
                'ordre': 2,
                'duree_heures': 10,
                'objectifs': (
                    "Maîtriser if/elif/else, boucles while et for, instructions "
                    "break/continue, boucles imbriquées."
                ),
                'contenu': (
                    "- Conditions if, elif, else\n"
                    "- Boucles while et for\n"
                    "- break, continue\n"
                    "- Clause else des boucles\n"
                    "- Boucles imbriquées\n"
                    "- Opérateurs logiques et bit à bit en contexte"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'Structures de données : collections',
                'ordre': 3,
                'duree_heures': 12,
                'objectifs': (
                    "Manipuler listes, tuples, dictionnaires, et comprendre "
                    "la mutabilité."
                ),
                'contenu': (
                    "- Listes : création, indexation, slicing, méthodes\n"
                    "- Listes multidimensionnelles\n"
                    "- Tuples et immutabilité\n"
                    "- Dictionnaires : clés, valeurs, parcours\n"
                    "- Chaînes comme séquences\n"
                    "- Cas pratiques : tri, recherche, transformation"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'Fonctions et exceptions',
                'ordre': 4,
                'duree_heures': 8,
                'objectifs': (
                    "Définir et appeler des fonctions, gérer la portée des "
                    "variables, gérer les exceptions proprement."
                ),
                'contenu': (
                    "- Fonctions : définition, appel, paramètres\n"
                    "- Paramètres positionnels, mot-clé, valeurs par défaut\n"
                    "- Portée locale et globale\n"
                    "- Retour de valeurs, fonctions sans retour\n"
                    "- Introduction à la récursivité\n"
                    "- try / except / else / finally\n"
                    "- Hiérarchie des exceptions intégrées"
                ),
                'video_url': None,
                'video_disponible': False,
            },
        ],
    },

    # ─── 5. Windows Server 2022 ───────────────────────────────────────────────
    {
        'slug': 'windows-server-2022',
        'titre': 'Windows Server 2022 — Administration',
        'domaine': 'Systèmes',
        'duree_heures': 35,
        'niveau': 'intermediaire',
        'programme': (
            'Module 1 : Installation et configuration de Windows Server 2022\n'
            'Module 2 : Active Directory Domain Services\n'
            'Module 3 : Services réseau\n'
            'Module 4 : Stockage et fichiers\n'
            'Module 5 : Hyper-V et virtualisation\n'
            'Module 6 : Sécurité et durcissement\n'
            'Module 7 : Hybride Azure et sauvegarde\n'
            'Module 8 : Préparation examen AZ-800'
        ),
        'description_longue': (
            "Formation complète d'administration de Windows Server 2022 en environnement "
            "hybride, alignée sur le programme officiel Microsoft AZ-800 (Administering "
            "Windows Server Hybrid Core Infrastructure). Couvre l'installation, Active "
            "Directory, Hyper-V, le stockage, la sécurité et l'intégration Azure. "
            "Destinée aux administrateurs systèmes souhaitant obtenir la certification "
            "Microsoft AZ-800."
        ),
        'certification': 'Microsoft AZ-800 — Administering Windows Server Hybrid Core Infrastructure',
        'tarif_min_gnf': 1400000,
        'tarif_max_gnf': 2200000,
        'modules': [
            {
                'titre': 'Installation et configuration de Windows Server 2022',
                'ordre': 1,
                'duree_heures': 4,
                'objectifs': (
                    "Installer Windows Server 2022 en modes Core et Desktop\n"
                    "Configurer le serveur via PowerShell et Windows Admin Center\n"
                    "Réaliser les tâches post-installation essentielles"
                ),
                'contenu': (
                    "Éditions Windows Server 2022 : Standard, Datacenter, Azure Edition\n"
                    "Installation : Core vs Desktop Experience, options\n"
                    "Configuration initiale : IP, nom, fuseau horaire, mises à jour\n"
                    "Windows Admin Center : installation, gestion centralisée\n"
                    "PowerShell 7 : cmdlets serveur, remoting, scripts\n"
                    "Server Manager et RSAT : gestion à distance\n"
                    "Nano Server : cas d'usage, conteneurs"
                ),
            },
            {
                'titre': 'Active Directory Domain Services',
                'ordre': 2,
                'duree_heures': 7,
                'objectifs': (
                    "Déployer et administrer une forêt Active Directory\n"
                    "Gérer les GPO, les relations d'approbation et la réplication\n"
                    "Configurer les sites AD et l'authentification Kerberos"
                ),
                'contenu': (
                    "Forêts, arbres, domaines : architecture et design\n"
                    "Installation AD DS : dcpromo, vérifications post-install\n"
                    "OUs, utilisateurs, groupes : délégation, templates\n"
                    "GPO : création, liaison, filtrage WMI, préférences\n"
                    "Approbations : externes, forêts, sélectives\n"
                    "Sites et services AD : réplication, KCC, bridgehead\n"
                    "FSMO : rôles, transfert, saisie\n"
                    "Kerberos et NTLM : authentification, tickets, délégation"
                ),
            },
            {
                'titre': 'Services réseau',
                'ordre': 3,
                'duree_heures': 5,
                'objectifs': (
                    "Configurer DNS, DHCP et IPAM sous Windows Server\n"
                    "Mettre en place le routage et l'accès distant\n"
                    "Administrer les certificats avec AD CS"
                ),
                'contenu': (
                    "DNS Server : zones primaires/secondaires, transferts, forwarders\n"
                    "DNS dynamique, scavenging, DNSSEC basique\n"
                    "DHCP : étendues, réservations, options, haute disponibilité\n"
                    "IPAM : déploiement, gestion IP, intégration DHCP/DNS\n"
                    "Routage : RAS, NAT, routage statique\n"
                    "VPN : PPTP, L2TP/IPsec, SSTP, accès distant\n"
                    "AD CS : PKI interne, certificats SSL, auto-enrôlement"
                ),
            },
            {
                'titre': 'Stockage et fichiers',
                'ordre': 4,
                'duree_heures': 5,
                'objectifs': (
                    "Configurer Storage Spaces et ReFS pour la résilience\n"
                    "Déployer DFS et gérer les partages SMB\n"
                    "Implémenter quotas et déduplication de données"
                ),
                'contenu': (
                    "Storage Spaces : pools, disques virtuels, résilience\n"
                    "Storage Spaces Direct (S2D) : cluster hyperconvergé\n"
                    "ReFS vs NTFS : cas d'usage, intégrité, self-healing\n"
                    "DFS Namespaces et DFS Replication : configuration\n"
                    "Partages SMB 3 : chiffrement, accès basé rôles\n"
                    "Quotas et rapports FSRM\n"
                    "Déduplication de données : modes, économies, surveillance"
                ),
            },
            {
                'titre': 'Hyper-V et virtualisation',
                'ordre': 5,
                'duree_heures': 5,
                'objectifs': (
                    "Déployer et administrer des machines virtuelles Hyper-V\n"
                    "Configurer les switches virtuels et la réplication Hyper-V\n"
                    "Comprendre les conteneurs Windows"
                ),
                'contenu': (
                    "Hyper-V : installation, configuration hôte, gestion mémoire\n"
                    "Machines virtuelles : création, génération 1/2, UEFI/SecureBoot\n"
                    "Switches virtuels : externes, internes, privés\n"
                    "Snapshots et points de contrôle : types, gestion\n"
                    "Live Migration et Storage Migration\n"
                    "Réplication Hyper-V : site secondaire, récupération\n"
                    "Conteneurs Windows : Docker, Windows Server Containers, isolation"
                ),
            },
            {
                'titre': 'Sécurité et durcissement',
                'ordre': 6,
                'duree_heures': 4,
                'objectifs': (
                    "Appliquer les baselines de sécurité Microsoft\n"
                    "Configurer BitLocker, Windows Defender et Credential Guard\n"
                    "Mettre en place JEA (Just Enough Administration)"
                ),
                'contenu': (
                    "Just Enough Administration (JEA) : rôles, capabilities, sessions\n"
                    "Windows Defender Antivirus : politiques, exclusions\n"
                    "BitLocker : TPM, récupération, réseau (BitLocker Network Unlock)\n"
                    "Credential Guard et Device Guard : configuration requise\n"
                    "Secured-Core Server : HVCI, Secure Boot, virtualisation\n"
                    "Audits Windows : politiques, Event Log, SIEM\n"
                    "Security Compliance Toolkit : baselines, analyse"
                ),
            },
            {
                'titre': 'Hybride Azure et sauvegarde',
                'ordre': 7,
                'duree_heures': 3,
                'objectifs': (
                    "Connecter les serveurs on-premises à Azure avec Azure Arc\n"
                    "Configurer la synchronisation Azure AD Connect\n"
                    "Mettre en place Azure Backup et Azure Site Recovery"
                ),
                'contenu': (
                    "Azure Arc : enrôlement de serveurs Windows/Linux, politiques\n"
                    "Azure AD Connect : synchronisation, filtrage, SSO transparent\n"
                    "Azure AD Connect Cloud Sync : déploiement léger\n"
                    "Azure Backup : MARS agent, Azure Backup Server, coffres\n"
                    "Azure Site Recovery : réplication, plans de récupération\n"
                    "Windows Admin Center : gestion hybride intégrée"
                ),
            },
            {
                'titre': 'Préparation examen AZ-800',
                'ordre': 8,
                'duree_heures': 2,
                'objectifs': (
                    "Réviser les domaines clés de l'examen AZ-800\n"
                    "Pratiquer avec des simulations de questions\n"
                    "Maîtriser la méthodologie de passage de l'examen"
                ),
                'contenu': (
                    "Revue des domaines AZ-800 : serveurs, AD DS, stockage, virtualisation, sécurité\n"
                    "Simulations de questions Microsoft Learn\n"
                    "Étude de cas et scénarios complexes\n"
                    "Conseils pratiques pour le jour de l'examen"
                ),
            },
        ],
    },

    # ─── 6. Linux RHCSA ──────────────────────────────────────────────────────
    {
        'slug': 'linux-rhcsa-rh124',
        'titre': 'Linux Administration — Red Hat System Administration I (RH124, RHEL 8.2)',
        'domaine': 'Systèmes',
        'duree_heures': 35,
        'niveau': 'intermediaire',
        'programme': (
            "Module 1 — Prise en main de la ligne de commande\n"
            "Module 2 — Gestion des fichiers depuis la ligne de commande\n"
            "Module 3 — Aide et documentation, édition de fichiers texte\n"
            "Module 4 — Gestion des utilisateurs et des groupes\n"
            "Module 5 — Permissions et contrôle d'accès\n"
            "Module 6 — Processus et services systemd\n"
            "Module 7 — Réseau et journalisation\n"
            "Module 8 — Stockage, installation de logiciels et préparation RHCSA"
        ),
        'description_longue': (
            "Formation d'administration système Linux basée sur le cursus officiel Red Hat "
            "RH124 (Red Hat System Administration I, RHEL 8.2). Elle pose les bases pour "
            "administrer un serveur Red Hat Enterprise Linux : ligne de commande, gestion "
            "des fichiers et des utilisateurs, permissions, processus, services systemd, "
            "réseau, stockage, et premières notions de sécurité. Première étape vers la "
            "certification RHCSA (EX200). Destinée aux administrateurs systèmes débutants/"
            "intermédiaires, techniciens support et professionnels IT souhaitant maîtriser "
            "Linux en environnement professionnel."
        ),
        'certification': 'Préparation RHCSA (EX200) — basée sur le cursus Red Hat RH124, RHEL 8.2',
        'tarif_min_gnf': 1000000,
        'tarif_max_gnf': 1800000,
        'modules': [
            {
                'titre': 'Prise en main de la ligne de commande',
                'ordre': 1,
                'duree_heures': 3,
                'objectifs': (
                    "Se connecter au système, exécuter des commandes de base, "
                    "obtenir de l'aide."
                ),
                'contenu': (
                    "Shell Bash, syntaxe des commandes\n"
                    "Navigation dans l'arborescence\n"
                    "Commandes : pwd, ls, cd\n"
                    "Aide : man, --help, info"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'Gestion des fichiers depuis la ligne de commande',
                'ordre': 2,
                'duree_heures': 4,
                'objectifs': (
                    "Créer, copier, déplacer, supprimer fichiers et répertoires ; "
                    "utiliser les liens."
                ),
                'contenu': (
                    "Arborescence FHS\n"
                    "Chemins absolus et relatifs\n"
                    "Commandes : cp, mv, rm, mkdir\n"
                    "Métacaractères (globbing)\n"
                    "Liens durs et symboliques"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'Aide et documentation, édition de fichiers texte',
                'ordre': 3,
                'duree_heures': 4,
                'objectifs': (
                    "Trouver de l'aide, éditer des fichiers avec Vim."
                ),
                'contenu': (
                    "Pages de manuel (man)\n"
                    "Documentation dans /usr/share/doc\n"
                    "Éditeur Vim : modes, commandes essentielles\n"
                    "Redirections et tubes (pipes)"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'Gestion des utilisateurs et des groupes',
                'ordre': 4,
                'duree_heures': 4,
                'objectifs': (
                    "Créer et gérer comptes utilisateurs et groupes, mots de passe."
                ),
                'contenu': (
                    "Commandes : useradd, usermod, userdel, groupadd\n"
                    "Fichiers : /etc/passwd, /etc/shadow, /etc/group\n"
                    "Gestion des mots de passe : passwd, chage\n"
                    "sudo et délégation de privilèges"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': "Permissions et contrôle d'accès",
                'ordre': 5,
                'duree_heures': 5,
                'objectifs': (
                    "Gérer les permissions de fichiers et la sécurité d'accès."
                ),
                'contenu': (
                    "Permissions rwx : lecture, écriture, exécution\n"
                    "chmod en mode symbolique et octal\n"
                    "chown et chgrp\n"
                    "Permissions par défaut (umask)\n"
                    "Permissions spéciales : SUID, SGID, sticky bit"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'Processus et services systemd',
                'ordre': 6,
                'duree_heures': 5,
                'objectifs': (
                    "Surveiller et contrôler processus et services."
                ),
                'contenu': (
                    "Surveillance des processus : ps, top\n"
                    "Gestion des signaux : kill et variantes\n"
                    "Priorités : nice et renice\n"
                    "systemd et systemctl : start, stop, enable, status\n"
                    "Cibles (targets) systemd"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'Réseau et journalisation',
                'ordre': 7,
                'duree_heures': 5,
                'objectifs': (
                    "Configurer le réseau et consulter les journaux système."
                ),
                'contenu': (
                    "Configuration IP avec nmcli\n"
                    "Hostname et résolution DNS\n"
                    "Journaux système : journalctl, rsyslog\n"
                    "Synchronisation horaire avec chrony"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'Stockage, installation de logiciels et préparation RHCSA',
                'ordre': 8,
                'duree_heures': 5,
                'objectifs': (
                    "Gérer le stockage de base, installer des logiciels, "
                    "réviser en vue de l'examen RHCSA."
                ),
                'contenu': (
                    "Partitions et systèmes de fichiers\n"
                    "Montage : mount et /etc/fstab\n"
                    "Gestion de paquets : dnf/yum, dépôts\n"
                    "Archives : tar\n"
                    "Révision et exercices type RHCSA"
                ),
                'video_url': None,
                'video_disponible': False,
            },
        ],
    },

    # ─── 7. Cybersécurité Fondamentaux ────────────────────────────────────────
    {
        'slug': 'cybersecurite-fondamentaux',
        'titre': 'Cybersécurité — Fondamentaux',
        'domaine': 'Cybersécurité',
        'duree_heures': 25,
        'niveau': 'debutant',
        'programme': (
            'Module 1 : Fondamentaux de la cybersécurité\n'
            'Module 2 : Sécurité réseau de base\n'
            'Module 3 : Sécurité des postes de travail\n'
            'Module 4 : Authentification et contrôle d\'accès\n'
            'Module 5 : Cryptographie appliquée\n'
            'Module 6 : Menaces courantes et défenses\n'
            'Module 7 : Conformité et bonnes pratiques\n'
            'Module 8 : Préparation examen'
        ),
        'description_longue': (
            "Formation d'introduction à la cybersécurité conforme aux référentiels "
            "internationaux CompTIA Security+ (SY0-701) et EC-Council CSCU. Idéale pour "
            "débuter dans la cybersécurité ou se reconvertir. Aucun prérequis technique "
            "avancé. À l'issue, les participants maîtrisent les concepts fondamentaux, "
            "les menaces courantes et les bonnes pratiques de sécurisation des systèmes "
            "d'information."
        ),
        'certification': 'CompTIA Security+ SY0-701 ou EC-Council CSCU',
        'tarif_min_gnf': 800000,
        'tarif_max_gnf': 1500000,
        'modules': [
            {
                'titre': 'Fondamentaux de la cybersécurité',
                'ordre': 1,
                'duree_heures': 3,
                'objectifs': (
                    "Comprendre la triade CIA et les concepts de base\n"
                    "Identifier les types de menaces, vulnérabilités et risques\n"
                    "Connaître les référentiels NIST et ISO 27001"
                ),
                'contenu': (
                    "Triade CIA : confidentialité, intégrité, disponibilité\n"
                    "Types de menaces : internes, externes, APT, cybercriminels\n"
                    "Vulnérabilités vs menaces vs risques : distinction et évaluation\n"
                    "Cadre NIST CSF : identifier, protéger, détecter, répondre, rétablir\n"
                    "ISO 27001/27002 : principes, domaines de contrôle\n"
                    "Glossaire cybersécurité : IOC, APT, zero-day, CVE, CVSS"
                ),
            },
            {
                'titre': 'Sécurité réseau de base',
                'ordre': 2,
                'duree_heures': 4,
                'objectifs': (
                    "Comprendre le rôle des pare-feux et des systèmes IDS/IPS\n"
                    "Configurer un VPN basique\n"
                    "Maîtriser les protocoles sécurisés (HTTPS, SSH, TLS)"
                ),
                'contenu': (
                    "Pare-feu : stateful, NGFW, règles, DMZ, zones\n"
                    "IDS/IPS : basé signature, anomalie, HIDS vs NIDS\n"
                    "VPN : concepts, SSL VPN, IPsec, accès distant sécurisé\n"
                    "Segmentation réseau : VLAN, microsegmentation\n"
                    "HTTPS et TLS : certificats, handshake, versions sécurisées\n"
                    "SSH : authentification par clé, bastion host\n"
                    "Protocoles non sécurisés à bannir : Telnet, FTP, HTTP"
                ),
            },
            {
                'titre': 'Sécurité des postes de travail',
                'ordre': 3,
                'duree_heures': 3,
                'objectifs': (
                    "Déployer et configurer les solutions antivirus et EDR\n"
                    "Mettre en place la gestion des correctifs\n"
                    "Durcir un poste Windows et Linux"
                ),
                'contenu': (
                    "Antivirus et EDR : différences, fonctionnement, configuration\n"
                    "Gestion des correctifs : WSUS, SCCM, Patch Tuesday\n"
                    "Durcissement Windows : GPO, CIS Benchmarks, AppLocker\n"
                    "Durcissement Linux : SSH, sudo, firewalld, SELinux\n"
                    "Chiffrement de disque : BitLocker, VeraCrypt\n"
                    "Gestion des applications : liste blanche, sandboxing\n"
                    "Analyse de logs postes : Event Viewer, journalctl"
                ),
            },
            {
                'titre': 'Authentification et contrôle d\'accès',
                'ordre': 4,
                'duree_heures': 3,
                'objectifs': (
                    "Implémenter une politique de mots de passe forte\n"
                    "Comprendre et configurer le MFA\n"
                    "Appliquer les modèles RBAC et le principe du moindre privilège"
                ),
                'contenu': (
                    "Mots de passe forts : complexité, longueur, gestionnaires\n"
                    "Multi-Factor Authentication : TOTP, FIDO2, SMS (risques)\n"
                    "Single Sign-On (SSO) : SAML, OAuth2, OIDC\n"
                    "RBAC : rôles, permissions, séparation des tâches\n"
                    "ABAC : attributs, contexte, politique dynamique\n"
                    "Gestion des identités privilegiées (PAM)\n"
                    "Audit des accès : journaux, revue périodique"
                ),
            },
            {
                'titre': 'Cryptographie appliquée',
                'ordre': 5,
                'duree_heures': 3,
                'objectifs': (
                    "Distinguer chiffrement symétrique et asymétrique\n"
                    "Comprendre les certificats SSL/TLS et la PKI\n"
                    "Appliquer les fonctions de hachage et les signatures numériques"
                ),
                'contenu': (
                    "Chiffrement symétrique : AES, clés, modes (CBC, GCM)\n"
                    "Chiffrement asymétrique : RSA, ECC, échange Diffie-Hellman\n"
                    "Fonctions de hachage : SHA-256, SHA-3, bcrypt (mots de passe)\n"
                    "Signatures numériques : non-répudiation, intégrité\n"
                    "Certificats SSL/TLS : structure X.509, validation DV/OV/EV\n"
                    "PKI : CA, CRL, OCSP, épinglage de certificat\n"
                    "Chiffrement en transit vs au repos"
                ),
            },
            {
                'titre': 'Menaces courantes et défenses',
                'ordre': 6,
                'duree_heures': 4,
                'objectifs': (
                    "Reconnaître et contrer les attaques phishing et ingénierie sociale\n"
                    "Comprendre le fonctionnement des ransomwares\n"
                    "Adopter une hygiène numérique professionnelle"
                ),
                'contenu': (
                    "Phishing : types (spear, whaling, smishing), signes d'alerte\n"
                    "Ingénierie sociale : prétexting, vishing, baiting\n"
                    "Ransomware : chiffrement, exfiltration, double extorsion\n"
                    "Malwares : virus, vers, chevaux de Troie, spyware, adware\n"
                    "Attaques courantes : DoS/DDoS, MITM, replay, brute force\n"
                    "Hygiène numérique : mises à jour, sauvegardes, vigilance email\n"
                    "Sensibilisation des utilisateurs : formations, simulations phishing"
                ),
            },
            {
                'titre': 'Conformité et bonnes pratiques',
                'ordre': 7,
                'duree_heures': 3,
                'objectifs': (
                    "Comprendre les obligations RGPD pour les entreprises\n"
                    "Implémenter une stratégie de sauvegarde 3-2-1\n"
                    "Rédiger un plan de continuité d'activité basique"
                ),
                'contenu': (
                    "RGPD : données personnelles, bases légales, droits des personnes\n"
                    "DPO et registre des traitements : obligations pratiques\n"
                    "Règle de sauvegarde 3-2-1 : implémentation et tests de restauration\n"
                    "Plan de continuité d'activité (PCA) : RTO, RPO, procédures\n"
                    "Plan de reprise d'activité (PRA) : déclenchement, tests\n"
                    "Gestion des incidents : détection, confinement, notification CNIL\n"
                    "Cyber-assurance : types de polices, critères"
                ),
            },
            {
                'titre': 'Préparation examen',
                'ordre': 8,
                'duree_heures': 2,
                'objectifs': (
                    "Réviser les domaines clés de CompTIA Security+ SY0-701\n"
                    "Pratiquer avec des QCM types\n"
                    "Adopter une stratégie efficace pour le jour J"
                ),
                'contenu': (
                    "Revue par domaine : menaces, cryptographie, PKI, sécurité réseau, IAM\n"
                    "QCM types Security+ : format, pièges courants\n"
                    "Simulations d'examen chronométrées\n"
                    "Ressources officielles CompTIA et EC-Council\n"
                    "Conseils pratiques pour le jour de l'examen"
                ),
            },
        ],
    },

    # ─── 8. Firewall FortiGate ────────────────────────────────────────────────
    {
        'slug': 'firewall-fortigate',
        'titre': 'Firewall FortiGate — Administration et sécurité',
        'domaine': 'Cybersécurité',
        'duree_heures': 35,
        'niveau': 'intermediaire',
        'programme': (
            "Module 1 : Introduction à FortiGate et à l'écosystème Fortinet\n"
            'Module 2 : Installation et configuration initiale\n'
            'Module 3 : Authentification et profils utilisateurs\n'
            'Module 4 : Politiques de sécurité (firewall policies)\n'
            'Module 5 : Inspection du contenu et sécurité applicative\n'
            'Module 6 : VPN IPsec et SSL VPN\n'
            'Module 7 : Routage avancé et SD-WAN\n'
            'Module 8 : Haute disponibilité et supervision\n'
            'Module 9 : Labs pratiques et préparation à la certification NSE 4'
        ),
        'description_longue': (
            "Formation officielle alignée sur le cursus Fortinet NSE 4, référence mondiale "
            "pour les administrateurs et ingénieurs sécurité travaillant avec les pare-feu "
            "FortiGate. Couvre l'installation, la configuration, le déploiement, la sécurité "
            "avancée et la supervision d'une infrastructure FortiGate en environnement "
            "professionnel. À l'issue de la formation, les participants sont capables "
            "d'administrer un FortiGate en production et de passer les examens "
            "NSE 4 FortiGate Security et FortiGate Infrastructure."
        ),
        'certification': 'Fortinet NSE 4 — Network Security Professional (FortiGate Security + FortiGate Infrastructure)',
        'tarif_min_gnf': 1800000,
        'tarif_max_gnf': 3000000,
        'modules': [
            {
                'titre': "Introduction à FortiGate et à l'écosystème Fortinet",
                'ordre': 1,
                'duree_heures': 3,
                'objectifs': (
                    "Comprendre le positionnement de Fortinet dans le marché de la sécurité\n"
                    "Identifier les composants du Fortinet Security Fabric\n"
                    "Naviguer dans les interfaces d'administration GUI et CLI du FortiGate"
                ),
                'contenu': (
                    "Fortinet Security Fabric : architecture intégrée, produits (FortiGate, FortiAnalyzer, FortiManager, FortiSandbox)\n"
                    "Gamme FortiGate : modèles entry-level, mid-range, high-end, FortiGate Cloud\n"
                    "Architectures de déploiement : périmétrique, interne, NGFW, SD-WAN\n"
                    "Interface GUI : tableau de bord, widgets, navigation, modes d'affichage\n"
                    "Interface CLI : commandes de base, config/get/show/diagnose\n"
                    "Licences FortiGuard : IPS, AV, Web Filter, App Control, abonnements"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'Installation et configuration initiale',
                'ordre': 2,
                'duree_heures': 4,
                'objectifs': (
                    "Déployer un FortiGate physique ou virtuel (VM)\n"
                    "Configurer les interfaces, zones et le routage statique\n"
                    "Maîtriser les modes NAT et Transparent"
                ),
                'contenu': (
                    "Déploiement physique : rack, câblage, accès console, reset to factory\n"
                    "FortiGate VM : déploiement VMware/KVM/Hyper-V, images, licences eval\n"
                    "Mode NAT vs Transparent : différences, cas d'usage, configuration\n"
                    "Interfaces réseau : types (physical, VLAN, aggregate, redundant, loopback)\n"
                    "Zones de sécurité : création, association d'interfaces, politique inter-zone\n"
                    "Routage statique : routes, passerelle par défaut, distance/métrique\n"
                    "VLAN : 802.1Q, VLAN sous-interfaces, agrégation LACP"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'Authentification et profils utilisateurs',
                'ordre': 3,
                'duree_heures': 4,
                'objectifs': (
                    "Configurer l'authentification locale, LDAP et RADIUS\n"
                    "Déployer le Fortinet Single Sign-On (FSSO)\n"
                    "Implémenter le contrôle d'accès basé sur l'identité (IBAC)"
                ),
                'contenu': (
                    "Authentification locale : utilisateurs, groupes, mots de passe\n"
                    "LDAP : connexion à Active Directory, requêtes, groupes AD\n"
                    "RADIUS : intégration, attributs VSA Fortinet, comptabilité\n"
                    "FSSO : agent DC, Collector Agent, polling mode, transparence\n"
                    "Authentification à deux facteurs : FortiToken (TOTP), email, SMS\n"
                    "Profils administrateurs : accès restreint, profils read-only, super_admin\n"
                    "IBAC : politiques basées sur l'identité utilisateur et le groupe AD"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'Politiques de sécurité (firewall policies)',
                'ordre': 4,
                'duree_heures': 5,
                'objectifs': (
                    "Créer et optimiser des politiques de filtrage FortiGate\n"
                    "Configurer le NAT source, destination et les VIP\n"
                    "Journaliser et analyser le trafic autorisé et bloqué"
                ),
                'contenu': (
                    "Politiques de sécurité : source/destination interface/zone, adresses, services\n"
                    "Actions : ACCEPT, DENY, IPSEC, SSL-VPN ; profiles de sécurité associés\n"
                    "NAT source : IP pool, PAT, NAT dynamique\n"
                    "NAT destination : VIP (Virtual IP), port forwarding\n"
                    "Sessions : table de sessions, timeouts, helpers applicatifs\n"
                    "Journalisation : niveaux de log, FortiLog, envoi vers FortiAnalyzer/syslog\n"
                    "Ordonnancement et optimisation : priorité, hit count, politique par défaut"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'Inspection du contenu et sécurité applicative',
                'ordre': 5,
                'duree_heures': 6,
                'objectifs': (
                    "Configurer les profils antivirus, IPS et contrôle d'application\n"
                    "Mettre en place le filtrage Web et l'inspection SSL/TLS\n"
                    "Comprendre le sandboxing et la prévention DLP"
                ),
                'contenu': (
                    "Antivirus : profils, modes (full, quick, deep scan), flux chiffrés\n"
                    "IPS : signatures, anomalies, sévérité, protection DoS, exemptions\n"
                    "Contrôle d'application : App Control profiles, catégories, overrides\n"
                    "Filtrage Web : Web Filter profiles, catégories FortiGuard, Safe Search\n"
                    "Filtrage DNS : DNS Filter, botnet C&C, blocage par catégorie\n"
                    "Inspection SSL/TLS : deep inspection, certificats CA, exemptions\n"
                    "DLP : profils, règles de détection, données sensibles\n"
                    "FortiSandbox : intégration, analyse comportementale, verdict"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'VPN IPsec et SSL VPN',
                'ordre': 6,
                'duree_heures': 5,
                'objectifs': (
                    "Configurer un VPN site-à-site IPsec entre deux FortiGate\n"
                    "Déployer le SSL VPN en mode portail et tunnel\n"
                    "Dépanner et assurer la haute disponibilité des tunnels VPN"
                ),
                'contenu': (
                    "VPN IPsec site-à-site : phase 1 (IKEv1/IKEv2), phase 2, politiques\n"
                    "VPN dial-up : authentification dynamique, mode agressif\n"
                    "SSL VPN portail : web-only, tunnel, split tunneling\n"
                    "SSL VPN tunnel : FortiClient, politiques d'accès, 2FA\n"
                    "Authentification VPN : preshared key, certificats, identités\n"
                    "Haute disponibilité VPN : redundant tunnels, route monitoring\n"
                    "Dépannage VPN : diagnose vpn ike, packet sniffer, debug flow"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'Routage avancé et SD-WAN',
                'ordre': 7,
                'duree_heures': 4,
                'objectifs': (
                    "Configurer OSPF et BGP sur FortiGate\n"
                    "Implémenter des règles SD-WAN pour l'optimisation des liens WAN\n"
                    "Mettre en place le policy-based routing"
                ),
                'contenu': (
                    "Routage dynamique : OSPF (zones, LSA, authentification), BGP (eBGP, attributs)\n"
                    "Route maps et filtres : prefix-list, access-list, redistribution\n"
                    "Policy-based routing : critères (source, service, interface), action\n"
                    "SD-WAN FortiGate : membres, zone SD-WAN, règles de performance\n"
                    "Métriques SD-WAN : latence, jitter, packet loss, link health monitoring\n"
                    "Sélection de chemin : SLA targets, stratégies (best quality, lowest cost)\n"
                    "Dépannage SD-WAN : get router info, diagnose sys sdwan, logs"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'Haute disponibilité et supervision',
                'ordre': 8,
                'duree_heures': 2,
                'objectifs': (
                    "Configurer un cluster FortiGate en mode actif-passif et actif-actif\n"
                    "Centraliser la supervision avec FortiAnalyzer et FortiManager\n"
                    "Gérer les sauvegardes et restaurations de configuration"
                ),
                'contenu': (
                    "Clusters HA : modes actif-passif et actif-actif, heartbeat, session pickup\n"
                    "Configuration HA : priorité, password, monitored interfaces\n"
                    "FortiAnalyzer : réception de logs, rapports, forensic\n"
                    "FortiManager : gestion centralisée de politiques, déploiement\n"
                    "Supervision SNMP : MIB Fortinet, traps, intégration NMS\n"
                    "Journaux et rapports : FortiView, dashboards, rapports planifiés\n"
                    "Sauvegarde et restauration : configuration, révisions, upgrade firmware"
                ),
                'video_url': None,
                'video_disponible': False,
            },
            {
                'titre': 'Labs pratiques et préparation à la certification NSE 4',
                'ordre': 9,
                'duree_heures': 2,
                'objectifs': (
                    "Consolider les acquis sur des scénarios complets de déploiement\n"
                    "Maîtriser le dépannage FortiGate en conditions réelles\n"
                    "Se préparer efficacement aux examens NSE 4 Security et Infrastructure"
                ),
                'contenu': (
                    "Lab 1 : déploiement complet FortiGate (interfaces, zones, politiques, NAT)\n"
                    "Lab 2 : sécurité applicative (AV, IPS, Web Filter, SSL inspection)\n"
                    "Lab 3 : VPN IPsec site-à-site et SSL VPN avec FortiClient\n"
                    "Lab 4 : SD-WAN avec deux liens WAN et SLA monitoring\n"
                    "Lab 5 : cluster HA actif-passif avec bascule automatique\n"
                    "Simulations d'examen NSE 4 : FortiGate Security (60 questions, 90 min)\n"
                    "Simulations d'examen NSE 4 : FortiGate Infrastructure (60 questions, 90 min)\n"
                    "Méthodologie de passage, ressources officielles Fortinet NSE Institute"
                ),
                'video_url': None,
                'video_disponible': False,
            },
        ],
    },

    # ─── Formations supplémentaires (sans modules détaillés) ──────────────────
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
            'Module 5 : Monitoring, logging et alerting\n'
            'Module 6 : Sécurité cloud et préparation AWS SAA-C03'
        ),
        'description_longue': (
            "Formation avancée couvrant les pratiques DevOps, la conteneurisation "
            "et les services AWS. Prépare à la certification AWS Solutions Architect Associate."
        ),
        'certification': 'AWS Solutions Architect Associate (SAA-C03)',
        'tarif_min_gnf': 2500000,
        'tarif_max_gnf': 4500000,
        'modules': [],
    },
    {
        'slug': 'marketing-digital-reseaux-sociaux',
        'titre': 'Marketing Digital & Réseaux Sociaux',
        'domaine': 'Marketing',
        'duree_heures': 20,
        'niveau': 'tous',
        'programme': (
            "Module 1 : Stratégie de présence digitale\n"
            "Module 2 : Création de contenu et storytelling\n"
            "Module 3 : Gestion des réseaux sociaux\n"
            "Module 4 : SEO et référencement local\n"
            "Module 5 : Publicité digitale et analytics"
        ),
        'description_longue': (
            "Formation pratique au marketing digital et à la gestion des réseaux sociaux, "
            "adaptée au marché guinéen et ouest-africain."
        ),
        'certification': '',
        'tarif_min_gnf': 700000,
        'tarif_max_gnf': 1200000,
        'modules': [],
    },
]


class Command(BaseCommand):
    help = 'Charge les données de démonstration (7 services, formations avec modules et sessions)'

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
        Formation.objects.filter(slug='python-data-science').delete()

        today = datetime.date.today()
        created_count = 0
        updated_count = 0

        for data in FORMATIONS:
            modules_data = data.pop('modules', [])

            formation, is_new = Formation.objects.update_or_create(
                slug=data['slug'],
                defaults={k: v for k, v in data.items() if k != 'slug'},
            )

            if is_new:
                created_count += 1
                # Session présentielle dans ~30 jours
                debut = today + datetime.timedelta(days=30)
                Session.objects.create(
                    formation=formation,
                    date_debut=debut,
                    date_fin=debut + datetime.timedelta(days=max(formation.duree_heures // 8, 1)),
                    format='presentiel',
                    places_max=15,
                    statut='ouverte',
                )
                # Session en ligne dans ~60 jours
                debut2 = today + datetime.timedelta(days=60)
                Session.objects.create(
                    formation=formation,
                    date_debut=debut2,
                    date_fin=debut2 + datetime.timedelta(days=max(formation.duree_heures // 8, 1)),
                    format='en_ligne',
                    places_max=30,
                    statut='ouverte',
                )
            else:
                updated_count += 1

            # Recréer les modules (idempotent)
            if modules_data:
                formation.modules.all().delete()
                for mod in modules_data:
                    FormationModule.objects.create(formation=formation, **mod)

        self.stdout.write(
            f'  Formations : {created_count} créées, {updated_count} mises à jour ({len(FORMATIONS)} total)'
        )
