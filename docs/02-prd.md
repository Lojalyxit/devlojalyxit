# 02 — PRD (Product Requirements Document)

**Produit :** Plateforme LojalyxIT
**Audience du document :** équipe de développement (dont Claude Code)

---

## 1. Vision produit

Un site qui transforme la crédibilité technique du fondateur et l'offre de LojalyxIT en leads qualifiés et en inscriptions formation, avec une identité visuelle premium (charte Wendy Damas) qui inspire confiance sur le marché guinéen et ouest-africain.

## 2. Personas

1. **Le DSI / DG d'entreprise** — cherche un prestataire IT fiable, veut voir références, certifications, SLA. Action clé : demander un devis / diagnostic gratuit.
2. **Le professionnel en montée de compétences** — veut se certifier (CCNA, CEH…). Action clé : s'inscrire à une formation.
3. **L'acheteur institutionnel (ministère, ONG)** — veut un partenaire crédible pour marchés publics. Action clé : télécharger la plaquette, contacter.
4. **Le client existant** — veut suivre ses contrats/tickets. Action clé : se connecter à l'espace client.

## 3. User stories prioritaires (MoSCoW)

### Must have
- En tant que visiteur, je vois clairement les 7 services et je peux demander un devis.
- En tant que visiteur, je consulte le catalogue formation avec tarifs en GNF.
- En tant que prospect, je remplis un formulaire de devis multi-étapes.
- En tant que candidat formation, je m'inscris à une session.
- En tant que client, je me connecte et vois mes contrats/tickets/factures.
- En tant qu'admin, je gère leads, formations, clients, contrats.

### Should have
- Diagnostic IT gratuit (formulaire dédié + RDV).
- Page de réassurance (garanties).
- Notifications email (devis, inscription, ticket).

### Could have
- Blog / actualités IT.
- Espace téléchargement (plaquette PDF, modèle de contrat).

### Won't have (v1)
- Paiement carte en ligne, app mobile native, anglais complet.

## 4. Spécifications par écran

### 4.1 Accueil
- **Hero** : titre Playfair sur fond noir `#080808`, slogan « Innover · Connecter · Transformer », CTA vert `#559540` « Demander un devis ».
- **Bandeau réassurance** : « Satisfait ou remboursé 30 jours · Support client français 7J/7 · Paiement 100% sécurisé SSL » (texte Poppins Light `#3D3D3D` ou `#CECECA` selon le fond).
- **Section 7 piliers** : cartes avec icône verte, titre, court descriptif.
- **Chiffres clés** : 12+ ans, 11 certifications, 7 ans d'enseignement.
- **CTA final** : diagnostic gratuit.

### 4.2 Services
- 7 sections (Serveurs & Cloud, Développement, Réseau, Marketing, Maintenance, Équipements, Formation) avec liste de prestations.

### 4.3 Centre de Formation
- Grille de formations (carte = titre, domaine, durée, niveau, tarif).
- Fiche détaillée + bouton « S'inscrire ».
- Tableau des 3 formules (Individuel / Intra / Pack).

### 4.4 Devis (multi-étapes)
1. Type de service (multi-sélection).
2. Détails du besoin (texte + budget + échéance).
3. Coordonnées (nom, société, email, téléphone).
4. Confirmation → enregistrement + email.

### 4.5 Espace client
- Dashboard, Contrats, Tickets (avec SLA), Factures, Mes formations.

### 4.6 Admin
- CRUD complet sur les entités (voir MCD).

## 5. Design system (issu de la charte Wendy Damas)

### Couleurs (tokens)
```
--color-primary:        #559540;  /* vert marque */
--color-primary-dark:   #628059;  /* vert variante */
--color-accent:         #C9A86A;  /* doré */
--color-bg-dark:        #080808;  /* noir fond */
--color-bg-deep:        #101001;  /* noir-vert */
--color-title:          #E7E7E7;  /* titres sur sombre */
--color-text-light:     #CECECA;  /* texte sur sombre */
--color-text-dark:      #3D3D3D;  /* texte sur clair */
--color-muted:          #999999;  /* secondaire */
--color-white:          #FFFFFF;
--color-danger:         #FE2B54;  /* accent alerte */
```

### Typographies
- Titres : **Playfair Display** (serif, 600/700).
- Signature / accents décoratifs : **Great Vibes**.
- Corps & UI : **Poppins** (300 Light pour le texte courant, 400/500 pour UI).

### Règles
- Fond sombre par défaut pour le hero et sections premium ; fond clair pour le contenu dense.
- Boutons primaires : fond `#559540`, texte blanc, coins arrondis 8px.
- Accents dorés réservés aux éléments « premium » (badges, séparateurs).
- Contraste AA garanti (texte `#3D3D3D` sur blanc, `#E7E7E7` sur `#080808`).

## 6. Tailwind — extension de thème (référence pour l'implémentation)

```js
// tailwind.config.ts (theme.extend.colors)
colors: {
  primary:   { DEFAULT: '#559540', dark: '#628059' },
  accent:    '#C9A86A',
  bgdark:    '#080808',
  bgdeep:    '#101001',
  title:     '#E7E7E7',
  textlight: '#CECECA',
  textdark:  '#3D3D3D',
  muted:     '#999999',
  danger:    '#FE2B54',
}
// fontFamily: { display: ['Playfair Display','serif'], script: ['Great Vibes','cursive'], sans: ['Poppins','sans-serif'] }
```

## 7. Métriques de succès

- Taux de conversion visiteur → demande de devis ≥ 3 %.
- Nombre d'inscriptions formation (objectif an 1 : 60–80 stagiaires).
- Temps de chargement page d'accueil < 2,5 s mobile.

## 8. Dépendances & risques

- Connexion mobile guinéenne : prioriser le poids des pages.
- Paiement manuel en v1 : prévoir un workflow de validation admin clair.
