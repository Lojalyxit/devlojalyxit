#!/usr/bin/env bash
# deploy/scripts/02-premier-deploiement.sh
# ─────────────────────────────────────────────────────────────────────────────
# Premier déploiement complet sur le VPS
# Prérequis : 01-setup-vps.sh exécuté, DNS configuré, .env créé
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

APP_DIR=/opt/lojalyxit
APP_USER=lojalyxit
REPO_URL="${REPO_URL:-https://github.com/VOTRE_USER/lojalyxit.git}"
DOMAIN="lojalyxit.com"

echo "════════════════════════════════════════"
echo "  LojalyxIT — Premier déploiement"
echo "════════════════════════════════════════"

# ── 1. Cloner le dépôt ───────────────────────────────────────────────────────
echo "[1/7] Clonage du dépôt…"
if [ -d "$APP_DIR/.git" ]; then
  echo "  Dépôt existant, mise à jour…"
  sudo -u "$APP_USER" git -C "$APP_DIR" pull
else
  sudo -u "$APP_USER" git clone "$REPO_URL" "$APP_DIR"
fi

# ── 2. Vérifier le .env ───────────────────────────────────────────────────────
echo "[2/7] Vérification du fichier .env…"
if [ ! -f "$APP_DIR/.env" ]; then
  echo "❌ ERREUR : $APP_DIR/.env introuvable."
  echo "   Copiez .env.prod.example en .env et remplissez toutes les valeurs."
  exit 1
fi

# ── 3. Backend (Docker Compose) ───────────────────────────────────────────────
echo "[3/7] Démarrage du backend (Docker Compose)…"
cd "$APP_DIR"
docker compose -f docker-compose.prod.yml pull --quiet
docker compose -f docker-compose.prod.yml up -d --build

# Attendre que la DB soit prête
echo "  Attente de la base de données…"
sleep 10

# Seed de démo
echo "  Chargement des données de démo…"
docker compose -f docker-compose.prod.yml exec backend python manage.py seed || true

# ── 4. Superuser admin ────────────────────────────────────────────────────────
echo ""
echo "⚙️  Création du superutilisateur Django admin"
docker compose -f docker-compose.prod.yml exec -it backend python manage.py createsuperuser

# ── 5. Systemd pour le backend ────────────────────────────────────────────────
echo "[4/7] Installation du service systemd backend…"
cp "$APP_DIR/deploy/systemd/lojalyxit-backend.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable lojalyxit-backend

# ── 6. Frontend Next.js ───────────────────────────────────────────────────────
echo "[5/7] Build du frontend…"
cd "$APP_DIR/frontend"
sudo -u "$APP_USER" npm ci --prefer-offline
sudo -u "$APP_USER" NEXT_PUBLIC_API_URL="https://$DOMAIN" npm run build

echo "  Démarrage via PM2…"
sudo -u "$APP_USER" pm2 start "$APP_DIR/frontend/ecosystem.config.cjs"
sudo -u "$APP_USER" pm2 save

# Générer le script de démarrage PM2 au boot
pm2_startup=$(sudo -u "$APP_USER" pm2 startup systemd -u "$APP_USER" --hp "/opt/$APP_USER" 2>&1 | tail -1)
echo "  Exécutez la commande suivante pour activer PM2 au démarrage :"
echo "  $pm2_startup"

# ── 7. Nginx ──────────────────────────────────────────────────────────────────
echo "[6/7] Configuration Nginx…"
cp "$APP_DIR/deploy/nginx/$DOMAIN" /etc/nginx/sites-available/
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/$DOMAIN
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# ── SSL Let's Encrypt ─────────────────────────────────────────────────────────
echo "[7/7] Certificat SSL Let's Encrypt…"
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" \
  --non-interactive --agree-tos \
  --email "ceo@$DOMAIN" \
  --redirect

systemctl reload nginx

echo ""
echo "✅ Premier déploiement terminé !"
echo ""
echo "   🌐 Site : https://$DOMAIN"
echo "   🔧 Admin Django : https://$DOMAIN/admin"
echo "   📊 Admin panel : https://$DOMAIN/admin-panel"
echo ""
echo "PROCHAINE ÉTAPE : Vérifiez https://$DOMAIN dans votre navigateur."
