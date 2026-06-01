# 01 — Cahier des Charges

**Projet :** Plateforme web LojalyxIT
**Client :** LojalyxIT SARL — Conakry, République de Guinée
**Version :** 1.0
**Stack cible :** Next.js + TypeScript + Tailwind (frontend) · Django + DRF + PostgreSQL (backend) · Prisma (ORM côté Next pour la partie publique en lecture) · Déploiement VPS LWS Ubuntu 24.04

---

## 1. Contexte

LojalyxIT SARL est une entreprise de solutions IT (cloud, cybersécurité, développement logiciel, infrastructure réseau, marketing digital, vente d'équipements, centre de formation certifiant) basée à Conakry. La plateforme doit servir de vitrine commerciale, de canal d'acquisition de contrats et de portail pour le Centre de Formation.

## 2. Objectifs

- Présenter les 7 piliers de service de manière crédible et professionnelle.
- Générer des leads : demandes de devis, prises de contact, diagnostic IT gratuit.
- Permettre l'inscription en ligne aux formations du Centre Certifiant.
- Offrir un espace client (suivi de contrats, tickets de support, factures).
- Asseoir la crédibilité (certifications, références, profil du fondateur).

## 3. Périmètre fonctionnel

### 3.1 Site vitrine (public)
- Page d'accueil (hero, piliers, chiffres clés, CTA devis).
- Page Services (7 piliers détaillés).
- Page Centre de Formation (catalogue, modalités, tarifs en GNF).
- Page À propos (entreprise, valeurs, profil du fondateur, certifications).
- Page Contact (formulaire + coordonnées + carte Conakry).
- Page Références / Réassurance (satisfait ou remboursé, support FR 7j/7, paiement sécurisé).

### 3.2 Module Devis
- Formulaire multi-étapes (type de service, budget, échéance, coordonnées).
- Génération d'une demande côté backend + notification email à `ceo@lojalyxit.com`.
- Statut suivi dans l'espace client.

### 3.3 Module Formation
- Catalogue (CCNA, CCNP, Python, CEH v13, Windows Server, Sécurité, etc.).
- Fiche formation (durée, niveau, programme, tarif, formats).
- Inscription en ligne (formule Individuel / Intra / Pack Entreprise).
- Paiement : virement / Mobile Money / espèces (enregistrement de l'intention, validation manuelle au lancement).

### 3.4 Espace client (authentifié)
- Tableau de bord (contrats actifs, prochaines échéances).
- Tickets de support (création, suivi, SLA visible).
- Factures (consultation, statut payé/impayé).
- Inscriptions formation de l'utilisateur.

### 3.5 Back-office (admin)
- Gestion des leads / devis.
- Gestion du catalogue formations et sessions.
- Gestion des clients, contrats, tickets, factures.
- Gestion du contenu (services, références, équipe).

## 4. Exigences non fonctionnelles

- **Performance :** LCP < 2,5 s sur connexion mobile guinéenne (3G/4G). Images optimisées, SSR/SSG sur les pages publiques.
- **Accessibilité :** WCAG AA, contrastes respectés (charte fournie).
- **SEO :** balises meta, sitemap, données structurées (LocalBusiness), URLs propres en français.
- **Sécurité :** HTTPS (Let's Encrypt), CSRF, rate-limiting sur formulaires, hashage des mots de passe (Argon2/bcrypt), conformité minimale données personnelles.
- **i18n :** français par défaut (anglais en option future).
- **Disponibilité :** objectif 99,5 %.
- **Responsive :** mobile-first (majorité du trafic guinéen sur mobile).

## 5. Contraintes techniques

- **Frontend :** Next.js (App Router) + TypeScript + Tailwind CSS.
- **Backend :** Django + Django REST Framework, base PostgreSQL.
- **ORM :** Django ORM côté backend ; Prisma utilisable côté Next pour lectures publiques (cache/ISR) si besoin, sinon consommation de l'API DRF.
- **Auth :** JWT (SimpleJWT) ou session DRF selon le besoin ; refresh token.
- **Déploiement :** VPS LWS Ubuntu 24.04, Nginx (reverse proxy), Gunicorn (Django) via systemd, PM2 (Next.js), Docker (backend conteneurisé), Let's Encrypt (TLS).
- **Domaine :** `lojalyxit.com` (et `www.lojalyxit.com`) — DNS géré depuis le panneau LWS (enregistrement A vers l'IP du VPS, `www` en CNAME/A).
- **Emails :** SMTP (compatible avec la config existante port 587 TLS).

## 6. Charte graphique (rappel — voir aussi le PRD)

| Rôle | Hex |
|------|-----|
| Vert principal (marque) | `#559540` |
| Vert variante (icônes) | `#628059` |
| Doré (accent) | `#C9A86A` |
| Noir (fond) | `#080808` |
| Blanc titre | `#E7E7E7` |
| Texte courant | `#3D3D3D` (fond clair) / `#CECECA` (fond sombre) |
| Gris secondaire | `#999999` |

Typographies : **Playfair Display** (titres), **Great Vibes** (signature/accents), **Poppins Light** (texte courant).

## 7. Livrables attendus

- Code source frontend + backend versionné (Git).
- Schéma de base de données (voir MCD).
- Documentation de déploiement VPS.
- Jeux de données de démonstration (services, formations).

## 8. Hors périmètre (v1)

- Paiement en ligne automatisé (carte) — géré manuellement en v1.
- Application mobile native.
- Multi-langue complet (anglais prévu en v2).

## 9. Planning indicatif

Aligné sur la feuille de route du plan d'entreprise : site en ligne dès le Mois 2, espace formation pour la 1ère session pilote au Mois 3.
