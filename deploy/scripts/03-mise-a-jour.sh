#!/usr/bin/env bash
# deploy/scripts/03-mise-a-jour.sh
# ─────────────────────────────────────────────────────────────────────────────
# Script de mise à jour (redéploiement après modification du code)
# Usage : bash deploy/scripts/03-mise-a-jour.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

APP_DIR=/opt/lojalyxit
APP_USER=lojalyxit
DOMAIN="lojalyxit.com"

echo "════════════════════════════════════════"
echo "  LojalyxIT — Mise à jour"
echo "════════════════════════════════════════"
echo "  $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# 1. Pull dernières modifications
echo "[1/4] Récupération du code…"
sudo -u "$APP_USER" git -C "$APP_DIR" pull --rebase

# 2. Backend
echo "[2/4] Mise à jour du backend…"
cd "$APP_DIR"
docker compose -f docker-compose.prod.yml build --quiet backend
docker compose -f docker-compose.prod.yml up -d --no-deps backend
echo "  Backend redémarré (migrations et collectstatic via entrypoint)."

# 3. Frontend
echo "[3/4] Rebuild du frontend…"
cd "$APP_DIR/frontend"
sudo -u "$APP_USER" npm ci --prefer-offline
sudo -u "$APP_USER" NEXT_PUBLIC_API_URL="https://$DOMAIN" npm run build
sudo -u "$APP_USER" pm2 reload lojalyxit-frontend
echo "  Frontend rechargé via PM2."

# 4. Vérification
echo "[4/4] Vérification des services…"
docker compose -f "$APP_DIR/docker-compose.prod.yml" ps
sudo -u "$APP_USER" pm2 list

echo ""
echo "✅ Mise à jour terminée — $(date '+%Y-%m-%d %H:%M:%S')"
echo "   🌐 https://$DOMAIN"
