# LojalyxIT — Plateforme Web

Site vitrine, module devis, centre de formation et espace client pour LojalyxIT SARL (Conakry, Guinée).

## Stack

| Couche | Technologie |
|--------|-------------|
| Frontend | Next.js 15 (App Router) · TypeScript · Tailwind CSS |
| Backend | Django 5 · Django REST Framework · SimpleJWT |
| Base de données | PostgreSQL 16 |
| Conteneurisation | Docker · docker-compose |
| Déploiement | VPS LWS Ubuntu 24.04 · Nginx · Gunicorn · PM2 |

## Démarrage rapide (développement)

### Prérequis
- Docker & Docker Compose
- Node.js 20+
- Python 3.12+ (optionnel si tout passe par Docker)

### 1. Cloner et configurer

```bash
git clone <repo>
cd lojalyxit
cp .env.example .env
# Éditer .env avec vos valeurs
```

### 2. Lancer le backend (Django + PostgreSQL)

```bash
docker-compose up -d
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

Backend disponible sur : http://localhost:8000
Admin Django : http://localhost:8000/admin

### 3. Lancer le frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend disponible sur : http://localhost:3000

## Structure du projet

```
lojalyxit/
├── docs/                    # Documentation (CDC, PRD, MCD, maquettes)
├── frontend/                # Next.js App Router
│   ├── src/app/             # Pages & layouts (App Router)
│   ├── src/components/      # Composants réutilisables
│   ├── src/lib/             # Utilitaires & API client
│   ├── tailwind.config.ts   # Tokens couleurs & typos
│   └── package.json
├── backend/                 # Django + DRF
│   ├── lojalyxit/           # Projet Django (settings, urls, wsgi)
│   ├── apps/                # Applications Django
│   │   ├── accounts/        # Utilisateurs (AbstractUser étendu)
│   │   ├── services/        # 7 piliers de service
│   │   ├── devis/           # Demandes de devis
│   │   ├── contrats/        # Contrats & factures
│   │   ├── formations/      # Catalogue & sessions
│   │   └── tickets/         # Support client
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

## Charte graphique (tokens Tailwind)

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#559540` | Vert marque, boutons CTA |
| `primary-dark` | `#628059` | Vert hover |
| `accent` | `#C9A86A` | Doré premium |
| `bgdark` | `#080808` | Fond hero/header |
| `bgdeep` | `#101001` | Fond sections sombres |
| `title` | `#E7E7E7` | Titres sur fond sombre |
| `textlight` | `#CECECA` | Texte courant sur fond sombre |
| `textdark` | `#3D3D3D` | Texte courant sur fond clair |
| `muted` | `#999999` | Texte secondaire |
| `danger` | `#FE2B54` | Alertes |

Typographies : **Playfair Display** (titres) · **Great Vibes** (signature) · **Poppins Light** (corps)

## Phases de développement

- [x] **Phase 1** — Scaffolding monorepo + Tailwind + Docker
- [ ] **Phase 2** — Backend Django : modèles, API DRF, JWT, seed
- [ ] **Phase 3** — Frontend public : design system + pages vitrine
- [ ] **Phase 4** — Parcours interactifs : devis, inscription, espace client
- [ ] **Phase 5** — Back-office admin
- [ ] **Phase 6** — Déploiement VPS LWS
