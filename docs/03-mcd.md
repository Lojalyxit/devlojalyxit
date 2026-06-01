# 03 — MCD (Modèle Conceptuel de Données)

**Backend :** Django + PostgreSQL. Le MCD ci-dessous se traduit en modèles Django (`models.py`).

---

## 1. Diagramme entité-association

```mermaid
erDiagram
    USER ||--o{ CONTRAT : possede
    USER ||--o{ TICKET : ouvre
    USER ||--o{ INSCRIPTION : effectue
    USER ||--o{ DEVIS : demande

    SERVICE ||--o{ CONTRAT_SERVICE : figure_dans
    CONTRAT ||--o{ CONTRAT_SERVICE : contient
    CONTRAT ||--o{ FACTURE : genere
    CONTRAT ||--o{ TICKET : concerne

    FORMATION ||--o{ SESSION : programme
    SESSION ||--o{ INSCRIPTION : recoit

    DEVIS ||--o{ DEVIS_SERVICE : liste
    SERVICE ||--o{ DEVIS_SERVICE : reference

    USER {
        int id PK
        string email UK
        string password_hash
        string full_name
        string company
        string phone
        string role "client|admin"
        datetime created_at
    }

    SERVICE {
        int id PK
        string slug UK
        string titre
        text description
        string icone
        int ordre
    }

    DEVIS {
        int id PK
        int user_id FK
        string nom
        string societe
        string email
        string telephone
        text besoin
        string budget
        string echeance
        string statut "nouveau|en_cours|envoye|gagne|perdu"
        datetime created_at
    }

    DEVIS_SERVICE {
        int id PK
        int devis_id FK
        int service_id FK
    }

    CONTRAT {
        int id PK
        int user_id FK
        string numero UK "LJX-ANNEE-NUM"
        string formule "starter|pro|premium"
        decimal montant_mensuel
        date date_debut
        date date_fin
        string statut "actif|suspendu|termine"
        datetime created_at
    }

    CONTRAT_SERVICE {
        int id PK
        int contrat_id FK
        int service_id FK
    }

    FACTURE {
        int id PK
        int contrat_id FK
        string numero UK
        decimal montant_ttc
        decimal tva "18.00"
        date date_emission
        date date_echeance
        string statut "payee|impayee|en_retard"
    }

    TICKET {
        int id PK
        int user_id FK
        int contrat_id FK
        string sujet
        text description
        string priorite "critique|haute|normale|faible"
        string statut "ouvert|en_cours|resolu|ferme"
        datetime created_at
        datetime resolved_at
    }

    FORMATION {
        int id PK
        string slug UK
        string titre
        string domaine
        int duree_heures
        string niveau "debutant|intermediaire|avance|tous"
        text programme
        decimal tarif_min_gnf
        decimal tarif_max_gnf
    }

    SESSION {
        int id PK
        int formation_id FK
        date date_debut
        date date_fin
        string format "presentiel|en_ligne|intra"
        int places_max
        string statut "ouverte|complete|terminee|annulee"
    }

    INSCRIPTION {
        int id PK
        int user_id FK
        int session_id FK
        string formule "individuel|intra|pack"
        string mode_paiement "virement|mobile_money|especes"
        string statut "en_attente|confirmee|payee|annulee"
        datetime created_at
    }
```

## 2. Description des entités

| Entité | Rôle |
|--------|------|
| **USER** | Utilisateurs : clients et admins (champ `role`). Extension du `AbstractUser` Django. |
| **SERVICE** | Les 7 piliers de service (référentiel éditable en admin). |
| **DEVIS** | Demandes de devis issues du formulaire multi-étapes. |
| **DEVIS_SERVICE** | Table d'association devis ↔ services demandés (N-N). |
| **CONTRAT** | Contrat de prestation signé (numéro `LJX-ANNÉE-NUM`). |
| **CONTRAT_SERVICE** | Services couverts par un contrat (N-N). |
| **FACTURE** | Factures rattachées à un contrat (TVA 18 %). |
| **TICKET** | Tickets de support avec priorité et SLA. |
| **FORMATION** | Catalogue du Centre de Formation. |
| **SESSION** | Sessions programmées d'une formation. |
| **INSCRIPTION** | Inscription d'un utilisateur à une session. |

## 3. Règles de gestion

- Un **DEVIS** peut exister sans `user_id` (prospect non inscrit) → `user_id` nullable.
- Un **CONTRAT** appartient à un seul USER mais couvre plusieurs SERVICES.
- La **FACTURE** calcule `montant_ttc = montant_ht * 1.18` (TVA 18 %).
- Le **TICKET** hérite des délais SLA selon `priorite` (Critique 1h/4h, Haute 2h/8h, Normale 4h/24h, Faible 8h/5j).
- Une **SESSION** passe à `complete` quand `inscriptions confirmées == places_max`.
- Les tarifs formation sont en **GNF** (pas de centimes — `DecimalField` max_digits adapté).

## 4. Indices recommandés

- `USER.email` (unique, index).
- `DEVIS.statut`, `CONTRAT.statut`, `TICKET.statut` (filtrage admin fréquent).
- `SESSION.date_debut` (tri catalogue).
- `FACTURE.statut` + `date_echeance` (relances impayés).
