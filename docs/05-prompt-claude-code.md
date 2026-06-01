# 05 — Prompt pour Claude Code

> Copie ce prompt dans Claude Code à la racine d'un repo vide. Les fichiers `docs/01..04` doivent être présents dans le repo : Claude Code s'y référera. Travaille par phases, valide chaque phase avant la suivante.

---

## Prompt maître

```
Tu es l'ingénieur principal du projet LojalyxIT. Lis d'abord les fichiers docs/01-cahier-des-charges.md, docs/02-prd.md, docs/03-mcd.md et docs/04-maquettes-figma.md, puis construis la plateforme en respectant STRICTEMENT la charte graphique et la stack ci-dessous.

# Stack imposée
- Frontend : Next.js (App Router) + TypeScript + Tailwind CSS. Prisma utilisable pour les lectures publiques en ISR si pertinent, sinon consommer l'API Django.
- Backend : Django + Django REST Framework + PostgreSQL. Auth JWT (djangorestframework-simplejwt).
- Conteneurisation : Docker pour le backend (Django + Postgres en docker-compose).
- Déploiement cible : VPS LWS Ubuntu 24.04, Nginx (reverse proxy), Gunicorn (Django) via systemd, PM2 (Next.js), Let's Encrypt (TLS).

# Charte graphique (NE PAS dévier)
Couleurs (tokens Tailwind) :
  primary #559540, primary-dark #628059, accent #C9A86A,
  bgdark #080808, bgdeep #101001, title #E7E7E7,
  textlight #CECECA, textdark #3D3D3D, muted #999999,
  white #FFFFFF, danger #FE2B54
Typographies (Google Fonts) :
  Titres = Playfair Display ; Signature/accents = Great Vibes ; Corps/UI = Poppins (300 pour le texte courant).
Principes : hero et sections premium sur fond sombre ; contenu dense sur fond clair ; boutons primaires verts coins 8px ; accents dorés réservés au premium ; contraste AA.

# Données
Implémente le schéma de docs/03-mcd.md en modèles Django : User (AbstractUser étendu, role client|admin), Service, Devis, DevisService, Contrat, ContratService, Facture, Ticket, Formation, Session, Inscription. TVA 18%. Tarifs formation en GNF. SLA dérivés de la priorité des tickets.

# Fonctionnalités (priorité Must have du PRD)
Vitrine (accueil, services, formation, à propos, contact, réassurance), module Devis multi-étapes (4 étapes) avec email à ceo@lojalyxit.com, catalogue + inscription formation, espace client (dashboard, contrats, tickets, factures, mes formations), back-office admin (CRUD complet).

# Méthode de travail — procède par phases et arrête-toi pour validation après chacune :
PHASE 1 — Scaffolding
  - Crée la structure monorepo : /frontend (Next.js) et /backend (Django).
  - Configure Tailwind avec les tokens et fonts ci-dessus (tailwind.config.ts + globals.css + import Google Fonts).
  - Mets en place docker-compose (postgres + backend), .env.example, README.

PHASE 2 — Backend (Django + DRF)
  - Modèles selon le MCD + migrations.
  - Serializers + ViewSets + routes DRF (/api/...). Auth JWT.
  - Permissions (admin vs client). Seed de démo (7 services, ~8 formations).
  - Endpoint d'envoi d'email pour les devis (SMTP, port 587 TLS, variables d'env).

PHASE 3 — Frontend public
  - Layout (header/footer), design system (composants Button, Card, Badge, Field, ReassuranceBar).
  - Pages : accueil, services, formation (liste + fiche), à propos, contact, réassurance.
  - Connexion à l'API pour services/formations.

PHASE 4 — Parcours interactifs
  - Devis multi-étapes (stepper) → POST API → confirmation.
  - Inscription formation → POST API.
  - Auth (login/register), espace client (dashboard, contrats, tickets, factures, mes formations).

PHASE 5 — Admin
  - Back-office (peut s'appuyer sur Django admin personnalisé OU pages Next protégées) : leads/devis, formations, sessions, clients, contrats, factures, tickets, avec filtres par statut.

PHASE 6 — Déploiement
  - Dockerfile backend, gunicorn + systemd unit, config Nginx (reverse proxy frontend:3000 et backend:8000), PM2 ecosystem pour Next, script Let's Encrypt (certbot), checklist de mise en prod sur VPS LWS Ubuntu 24.04.
  - DNS : domaine lojalyxit.com hébergé/géré chez LWS — enregistrement A vers l'IP du VPS, plus www en CNAME ou A. Prévois la note de configuration DNS (panneau LWS) dans la checklist.

# Contraintes transverses
- Mobile-first, performances (images optimisées, SSG/ISR sur pages publiques), SEO (metadata, sitemap, LocalBusiness JSON-LD), français par défaut.
- Sécurité : CSRF, rate-limiting sur formulaires, hashage mots de passe, HTTPS.
- Code typé, commenté là où c'est utile, conventions claires.

Commence par la PHASE 1. Montre-moi l'arborescence et les fichiers de config, puis attends ma validation avant la PHASE 2.
```

---

## Prompts de phase (à coller au fur et à mesure)

**Phase 2 :** « Passe à la PHASE 2. Implémente les modèles Django du MCD avec migrations, puis les serializers, viewsets et routes DRF avec auth JWT et permissions client/admin. Ajoute un script de seed. »

**Phase 3 :** « Passe à la PHASE 3. Construis le design system (tokens + composants) puis les pages publiques en respectant la charte Wendy Damas. Mobile-first. »

**Phase 4 :** « Passe à la PHASE 4. Implémente le devis multi-étapes, l'inscription formation, l'auth et l'espace client connectés à l'API. »

**Phase 5 :** « Passe à la PHASE 5. Implémente le back-office admin avec CRUD et filtres par statut. »

**Phase 6 :** « Passe à la PHASE 6. Génère Dockerfile, docker-compose prod, config Nginx, unit systemd Gunicorn, ecosystem PM2, et la checklist de déploiement Let's Encrypt sur VPS LWS Ubuntu 24.04. »

---

## Rappel charte (à garder sous les yeux)

| Rôle | Hex | Police |
|------|-----|--------|
| Vert marque | `#559540` | — |
| Vert variante | `#628059` | — |
| Doré accent | `#C9A86A` | — |
| Noir fond | `#080808` | — |
| Titres | `#E7E7E7` | Playfair Display |
| Texte clair fond sombre | `#CECECA` | Poppins Light |
| Texte fond clair | `#3D3D3D` | Poppins Light |
| Gris secondaire | `#999999` | — |
| Signature | `#C9A86A` | Great Vibes |
