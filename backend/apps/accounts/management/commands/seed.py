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

    # ─── 4. Python Data Science ───────────────────────────────────────────────
    {
        'slug': 'python-data-science',
        'titre': 'Python pour la Data Science',
        'domaine': 'Développement',
        'duree_heures': 30,
        'niveau': 'intermediaire',
        'programme': (
            'Module 1 : Python avancé pour la data\n'
            'Module 2 : Manipulation de données avec NumPy\n'
            'Module 3 : Pandas pour l\'analyse de données\n'
            'Module 4 : Visualisation de données\n'
            'Module 5 : Statistiques et probabilités appliquées\n'
            'Module 6 : Introduction au machine learning\n'
            'Module 7 : Projet final et préparation examen'
        ),
        'description_longue': (
            "Formation Python orientée Data Science, conforme au programme Python Institute "
            "(PCAP / PCPP1). De la maîtrise avancée du langage à la manipulation de données "
            "et l'introduction au machine learning avec scikit-learn. Idéale pour les "
            "développeurs, analystes et ingénieurs souhaitant évoluer vers les métiers de "
            "la donnée et de l'intelligence artificielle."
        ),
        'certification': 'Python Institute PCAP / PCPP1 (orientation Data Science)',
        'tarif_min_gnf': 1200000,
        'tarif_max_gnf': 2000000,
        'modules': [
            {
                'titre': 'Python avancé pour la data',
                'ordre': 1,
                'duree_heures': 5,
                'objectifs': (
                    "Maîtriser les structures avancées et les idiomes Python\n"
                    "Gérer les environnements virtuels et les dépendances\n"
                    "Écrire du code Python performant et maintenable"
                ),
                'contenu': (
                    "Types avancés : namedtuple, dataclass, defaultdict, Counter\n"
                    "Comprehensions : list, dict, set, expressions génératrices\n"
                    "Générateurs et itérateurs : yield, send, StopIteration\n"
                    "Décorateurs : @functools.wraps, décorateurs paramétrés\n"
                    "Gestion des fichiers : pathlib, CSV, JSON, Excel\n"
                    "Virtualenv et pip : gestion des dépendances, requirements.txt\n"
                    "Optimisation : profiling, cProfile, line_profiler"
                ),
            },
            {
                'titre': 'Manipulation de données avec NumPy',
                'ordre': 2,
                'duree_heures': 4,
                'objectifs': (
                    "Créer et manipuler des arrays NumPy multi-dimensionnels\n"
                    "Appliquer les opérations vectorisées pour la performance\n"
                    "Comprendre le broadcasting NumPy"
                ),
                'contenu': (
                    "Arrays : création, dtype, shape, reshape, flatten\n"
                    "Indexation et slicing : avancée, masques booléens, fancy indexing\n"
                    "Broadcasting : règles, cas d'usage, performance\n"
                    "Opérations vectorisées : ufunc, aggregation, cumul\n"
                    "Algèbre linéaire : dot, matmul, linalg\n"
                    "Nombres aléatoires : np.random, seeds, distributions\n"
                    "Performance : comparaison avec listes Python"
                ),
            },
            {
                'titre': "Pandas pour l'analyse de données",
                'ordre': 3,
                'duree_heures': 6,
                'objectifs': (
                    "Charger, nettoyer et transformer des datasets avec Pandas\n"
                    "Réaliser des agrégations et jointures de DataFrames\n"
                    "Analyser des séries temporelles"
                ),
                'contenu': (
                    "Series et DataFrame : création, index, colonnes, dtypes\n"
                    "Chargement de données : CSV, Excel, SQL, JSON, API\n"
                    "Nettoyage : valeurs manquantes, doublons, outliers\n"
                    "Transformation : apply, map, vectorisé, str accessor\n"
                    "Agrégation : groupby, pivot_table, crosstab\n"
                    "Jointures : merge, join, concat\n"
                    "Séries temporelles : DatetimeIndex, resample, rolling"
                ),
            },
            {
                'titre': 'Visualisation de données',
                'ordre': 4,
                'duree_heures': 4,
                'objectifs': (
                    "Créer des visualisations statiques avec Matplotlib et Seaborn\n"
                    "Construire des dashboards interactifs avec Plotly\n"
                    "Choisir le bon type de graphique selon les données"
                ),
                'contenu': (
                    "Matplotlib : figures, subplots, styles, annotations\n"
                    "Seaborn : distributions, corrélations, catégories, pairplot\n"
                    "Plotly : graphiques interactifs, hover, zoom\n"
                    "Plotly Dash : dashboards web interactifs\n"
                    "Bonnes pratiques : lisibilité, couleurs, accessibilité\n"
                    "Export : PNG haute résolution, SVG, HTML"
                ),
            },
            {
                'titre': 'Statistiques et probabilités appliquées',
                'ordre': 5,
                'duree_heures': 4,
                'objectifs': (
                    "Calculer et interpréter les statistiques descriptives\n"
                    "Comprendre les distributions et les tests d'hypothèses\n"
                    "Analyser les corrélations entre variables"
                ),
                'contenu': (
                    "Statistiques descriptives : moyenne, médiane, écart-type, IQR\n"
                    "Distributions : normale, binomiale, Poisson, t de Student\n"
                    "Intervalles de confiance : calcul et interprétation\n"
                    "Tests d'hypothèses : t-test, chi-deux, ANOVA\n"
                    "Corrélations : Pearson, Spearman, heatmaps\n"
                    "SciPy.stats : implémentation pratique\n"
                    "Valeurs aberrantes : détection et traitement"
                ),
            },
            {
                'titre': 'Introduction au machine learning',
                'ordre': 6,
                'duree_heures': 5,
                'objectifs': (
                    "Implémenter des algorithmes de régression et classification\n"
                    "Évaluer les performances d'un modèle ML\n"
                    "Comprendre le clustering non supervisé"
                ),
                'contenu': (
                    "Pipeline ML : données, features, entraînement, évaluation\n"
                    "Régression : linéaire, Ridge, Lasso, métriques MSE/R²\n"
                    "Classification : KNN, arbre de décision, forêt aléatoire\n"
                    "Évaluation : validation croisée, matrices de confusion, ROC-AUC\n"
                    "Clustering : K-Means, DBSCAN, silhouette score\n"
                    "Scikit-learn : Pipeline, ColumnTransformer, GridSearchCV\n"
                    "Overfitting : régularisation, validation croisée"
                ),
            },
            {
                'titre': 'Projet final et préparation examen',
                'ordre': 7,
                'duree_heures': 2,
                'objectifs': (
                    "Réaliser un projet data complet de bout en bout\n"
                    "Se préparer aux certifications PCAP et PCPP1\n"
                    "Consolider les acquis via des exercices types"
                ),
                'contenu': (
                    "Projet fil rouge : collecte, nettoyage, analyse, visualisation, modèle\n"
                    "Présentation et documentation du projet\n"
                    "Exercices type PCAP : syntaxe avancée, OOP, modules\n"
                    "Exercices type PCPP1 : programmation avancée, networking\n"
                    "Ressources et communautés pour continuer à apprendre"
                ),
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

    # ─── 6. Cybersécurité Fondamentaux ────────────────────────────────────────
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
