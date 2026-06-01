# Checklist de déploiement — LojalyxIT
**Cible :** VPS LWS Ubuntu 24.04 LTS · Domaine : lojalyxit.com

---

## 0. Avant de commencer

- [ ] Avoir accès SSH root au VPS LWS
- [ ] Avoir le dépôt Git prêt (GitHub / GitLab)
- [ ] Avoir les identifiants SMTP pour les emails
- [ ] Avoir généré une `SECRET_KEY` Django forte :
  ```bash
  python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
  ```

---

## 1. Configuration DNS chez LWS

> Panneau LWS → Mes domaines → lojalyxit.com → Zone DNS

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| **A** | `@` (ou `lojalyxit.com`) | `<IP_VPS>` | 3600 |
| **A** | `www` | `<IP_VPS>` | 3600 |
| **MX** | `@` | *(si emails sur ce domaine)* | 3600 |

**Récupérer l'IP du VPS :**
```bash
# Sur le VPS
curl -s ifconfig.me
```

**Vérifier la propagation DNS (attendre 5–30 min) :**
```bash
nslookup lojalyxit.com 8.8.8.8
# Doit retourner votre IP VPS
```

---

## 2. Setup initial du VPS

```bash
# Connexion SSH
ssh root@<IP_VPS>

# Transférer le script (depuis votre machine locale)
scp deploy/scripts/01-setup-vps.sh root@<IP_VPS>:/tmp/

# Exécuter sur le VPS
bash /tmp/01-setup-vps.sh
```

**Ce que fait le script :**
- Mise à jour système Ubuntu 24.04
- Installation : Docker, Node.js 20, PM2, Nginx, Certbot, UFW, Fail2ban
- Création de l'utilisateur `lojalyxit`
- Configuration du pare-feu (ports 22, 80, 443)
- Préparation des répertoires

---

## 3. Configuration de l'environnement

```bash
# Sur le VPS, en tant que root
cd /opt/lojalyxit

# Copier le template .env de production
cp .env.prod.example .env

# Éditer avec vos vraies valeurs
nano .env
```

**Variables obligatoires à remplir :**
```env
SECRET_KEY=<généré à l'étape 0>
POSTGRES_PASSWORD=<mot de passe fort>
EMAIL_HOST=<votre serveur SMTP>
EMAIL_HOST_USER=<votre email>
EMAIL_HOST_PASSWORD=<mot de passe SMTP>
```

---

## 4. Premier déploiement

> ⚠️ Assurez-vous que le DNS pointe vers le VPS avant cette étape.

```bash
# Sur le VPS, en tant que root
export REPO_URL="https://github.com/VOTRE_USER/lojalyxit.git"
bash /opt/lojalyxit/deploy/scripts/02-premier-deploiement.sh
```

**Ce que fait le script :**
1. Clone le dépôt Git
2. Démarre le backend Django + PostgreSQL via Docker Compose
3. Exécute migrations + collectstatic + seed de démo
4. Crée le superutilisateur Django admin (interactif)
5. Installe le service systemd pour le backend
6. Build le frontend Next.js
7. Démarre le frontend via PM2
8. Configure Nginx comme reverse proxy
9. Obtient le certificat SSL Let's Encrypt (certbot)

---

## 5. Vérifications post-déploiement

```bash
# Statut des services
systemctl status lojalyxit-backend
pm2 list
systemctl status nginx

# Logs backend Django
docker compose -f /opt/lojalyxit/docker-compose.prod.yml logs -f backend

# Logs frontend Next.js
pm2 logs lojalyxit-frontend --lines 50

# Logs Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

**Checklist de vérification manuelle :**
- [ ] `https://lojalyxit.com` charge la page d'accueil
- [ ] `https://www.lojalyxit.com` redirige vers `https://lojalyxit.com`
- [ ] `http://lojalyxit.com` redirige vers HTTPS (301)
- [ ] `https://lojalyxit.com/api/services/` retourne du JSON
- [ ] `https://lojalyxit.com/admin/` affiche le login Django
- [ ] Certificat SSL valide (cadenas vert dans le navigateur)
- [ ] Formulaire de devis → email reçu à ceo@lojalyxit.com
- [ ] Inscription formation → compte créé, connexion OK
- [ ] Pages mobile correctes (tester depuis un smartphone)

---

## 6. Renouvellement automatique SSL

Certbot installe automatiquement un cron/timer systemd pour renouveler le certificat. Vérifier :

```bash
# Voir le timer
systemctl list-timers certbot

# Tester le renouvellement (dry-run)
certbot renew --dry-run
```

---

## 7. Mises à jour futures

```bash
# Sur le VPS, en root
bash /opt/lojalyxit/deploy/scripts/03-mise-a-jour.sh
```

Ou manuellement :
```bash
cd /opt/lojalyxit
git pull

# Backend
docker compose -f docker-compose.prod.yml build backend
docker compose -f docker-compose.prod.yml up -d --no-deps backend

# Frontend
cd frontend
npm ci && npm run build
pm2 reload lojalyxit-frontend
```

---

## 8. Sauvegardes

### Base de données PostgreSQL
```bash
# Sauvegarde manuelle
docker compose -f /opt/lojalyxit/docker-compose.prod.yml exec db \
  pg_dump -U lojalyxit_user lojalyxit > backup_$(date +%Y%m%d).sql

# Sauvegarde automatique (crontab root)
# crontab -e
# 0 2 * * * docker compose -f /opt/lojalyxit/docker-compose.prod.yml exec -T db \
#   pg_dump -U lojalyxit_user lojalyxit > /opt/backups/lojalyxit_$(date +\%Y\%m\%d).sql
```

### Fichiers media
```bash
tar -czf media_backup_$(date +%Y%m%d).tar.gz /opt/lojalyxit/backend/media/
```

---

## 9. Monitoring

```bash
# Ressources système
htop

# Espace disque
df -h

# Conteneurs Docker
docker stats

# PM2
pm2 monit
```

---

## 10. Commandes utiles

```bash
# Redémarrer le backend
systemctl restart lojalyxit-backend

# Redémarrer le frontend
pm2 restart lojalyxit-frontend

# Redémarrer Nginx
systemctl reload nginx

# Voir les logs Django en direct
docker compose -f /opt/lojalyxit/docker-compose.prod.yml logs -f --tail=100 backend

# Shell Django
docker compose -f /opt/lojalyxit/docker-compose.prod.yml exec backend python manage.py shell

# Créer un admin supplémentaire
docker compose -f /opt/lojalyxit/docker-compose.prod.yml exec backend python manage.py createsuperuser

# Reseed les données de démo
docker compose -f /opt/lojalyxit/docker-compose.prod.yml exec backend python manage.py seed --reset
```

---

## Résumé de l'architecture déployée

```
Internet (HTTPS)
    │
    ▼
Nginx :443 (lojalyxit.com)
    ├── /static/     → /opt/lojalyxit/backend/staticfiles/ (direct)
    ├── /media/      → /opt/lojalyxit/backend/media/ (direct)
    ├── /api/*       → localhost:8000 (Django via Docker)
    ├── /admin/*     → localhost:8000 (Django Admin via Docker)
    └── /*           → localhost:3000 (Next.js via PM2)

Docker Compose (lojalyxit-backend.service)
    ├── backend (Django + Gunicorn) → port 8000
    └── db (PostgreSQL 16)          → port 5432 (interne)

PM2
    └── lojalyxit-frontend (Next.js) → port 3000
```
