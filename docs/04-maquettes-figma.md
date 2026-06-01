# 04 — Spécification des Maquettes Figma

Ce document décrit les écrans à produire dans Figma (ou à générer directement en code). Il sert de brief design conforme à la charte Wendy Damas. Chaque écran liste : structure, contenu, et tokens appliqués.

---

## 0. Fondations Figma

### Styles de couleur (à créer comme Color Styles)
```
primary/green      #559540
primary/green-dark #628059
accent/gold        #C9A86A
bg/black           #080808
bg/deep            #101001
text/title         #E7E7E7
text/light         #CECECA
text/dark          #3D3D3D
text/muted         #999999
base/white         #FFFFFF
state/danger       #FE2B54
```

### Styles de texte (Text Styles)
| Style | Police | Taille / poids |
|-------|--------|----------------|
| Display/H1 | Playfair Display | 48 / 700 |
| Display/H2 | Playfair Display | 34 / 600 |
| Heading/H3 | Poppins | 22 / 600 |
| Body | Poppins | 16 / 300 (Light) |
| Body-strong | Poppins | 16 / 500 |
| Caption | Poppins | 13 / 400 |
| Signature | Great Vibes | 40 / 400 |

### Grille
- Desktop : 12 colonnes, marge 80px, gutter 24px, conteneur max 1200px.
- Mobile : 4 colonnes, marge 20px (mobile-first prioritaire).
- Espacement : échelle 4 / 8 / 16 / 24 / 40 / 64.
- Rayons : boutons 8px, cartes 12px.

### Composants à créer
Bouton (primary/secondary/ghost), Carte service, Carte formation, Champ de formulaire, Badge doré, Bandeau réassurance, Header, Footer, Stepper (devis), Tableau (SLA / tarifs).

---

## 1. Écran — Accueil (Desktop + Mobile)

- **Header** (fond `bg/black`, logo « LojalyxIT » en Playfair `text/title`, nav Poppins `text/light`, bouton primary « Devis »).
- **Hero** : fond `bg/black`, image d'arrière-plan sombre type bureau IT. H1 Playfair `text/title`, slogan en `primary/green` « Innover · Connecter · Transformer », sous-texte `text/light`, bouton primary `#559540` + bouton ghost bordure dorée `#C9A86A`.
- **Bandeau réassurance** : 3 items en ligne (icône verte + texte Poppins Light) — « Satisfait ou remboursé 30 jours · Support client français 7J/7 · Paiement 100% sécurisé SSL ».
- **Section 7 piliers** : titre H2 Playfair, grille de 7 cartes (icône `primary/green`, titre H3, texte `text/dark` sur carte blanche). Coins 12px, ombre douce.
- **Chiffres clés** : bande fond `bg/deep`, 3 chiffres en `accent/gold` (12+, 11, 7) + libellés `text/light`.
- **CTA diagnostic** : fond `primary/green`, texte blanc, bouton blanc.
- **Footer** : fond `bg/black`, coordonnées, signature « LojalyxIT » optionnelle en Great Vibes `accent/gold`.

## 2. Écran — Services
- Hero court (H2 Playfair). 7 blocs alternés (fond blanc / `bg/deep`), chaque bloc : icône, titre, liste de prestations (puces vertes `#559540`), visuel.

## 3. Écran — Centre de Formation
- Hero formation + accroche.
- Grille de cartes formation : badge domaine doré, titre H3, ligne durée/niveau (`text/muted`), tarif GNF en `primary/green`, bouton « Détails ».
- Section 3 formules (Individuel / Intra / Pack) : 3 colonnes, la colonne « Intra » mise en avant avec bordure dorée.

## 4. Écran — Fiche Formation
- Titre H1, méta (durée, niveau, format), programme (liste), encart tarif sticky + bouton « S'inscrire » primary.

## 5. Écran — Devis (Stepper 4 étapes)
- Barre de progression (segments verts actifs).
- Étape 1 : cases à cocher services (état coché = fond `primary/green`).
- Étape 2 : textarea besoin, select budget, select échéance.
- Étape 3 : champs nom / société / email / téléphone.
- Étape 4 : récap + bouton « Envoyer ma demande ».
- Confirmation : carte succès, icône verte, texte `text/dark`.

## 6. Écran — Contact
- Formulaire (gauche) + coordonnées & carte Conakry (droite). Champs Poppins, labels `text/dark`, focus bordure `primary/green`.

## 7. Écran — Connexion / Inscription
- Carte centrée sur fond `bg/deep`, logo, champs email/mot de passe, bouton primary, lien secondaire.

## 8. Écran — Espace client / Dashboard
- Sidebar (fond `bg/black`, items `text/light`, actif `primary/green`).
- Cartes résumé : contrats actifs, prochaine échéance, tickets ouverts.
- Tableaux : Contrats, Factures (badge statut : payé vert, impayé `danger`), Tickets (badge priorité).

## 9. Écran — Admin
- Layout type back-office : sidebar, tables CRUD (leads/devis, formations, sessions, clients, contrats, factures, tickets), filtres par statut.

---

## Notes d'implémentation
- Mobile-first : concevoir d'abord les écrans 4 colonnes.
- Réutiliser strictement les Color Styles et Text Styles ci-dessus pour garantir la cohérence avec le code Tailwind.
- Les icônes : set linéaire fin (style trait), teinte `primary/green`.
