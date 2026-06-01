#!/usr/bin/env bash
# deploy/scripts/01-setup-vps.sh
# ─────────────────────────────────────────────────────────────────────────────
# Prérequis : VPS LWS Ubuntu 24.04 LTS tout frais, connexion root SSH
# Exécution : bash 01-setup-vps.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

APP_DIR=/opt/lojalyxit
APP_USER=lojalyxit
LOG_DIR=/var/log/lojalyxit
NODE_VERSION=20

echo "════════════════════════════════════════"
echo "  LojalyxIT — Configuration VPS initiale"
echo "════════════════════════════════════════"

# 1. Mise à jour système
echo "[1/9] Mise à jour du système…"
apt-get update -q && apt-get upgrade -y -q

# 2. Paquets essentiels
echo "[2/9] Installation des paquets essentiels…"
apt-get install -y -q \
  curl wget git ufw fail2ban \
  nginx certbot python3-certbot-nginx \
  postgresql-client \
  build-essential

# 3. Docker
echo "[3/9] Installation de Docker…"
if ! command -v docker &>/dev/null; then
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  systemctl start docker
else
  echo "  Docker déjà installé, passage à la suite."
fi

# 4. Node.js + PM2
echo "[4/9] Installation de Node.js ${NODE_VERSION} et PM2…"
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
  apt-get install -y nodejs
fi
npm install -g pm2

# 5. Utilisateur applicatif
echo "[5/9] Création de l'utilisateur ${APP_USER}…"
if ! id "$APP_USER" &>/dev/null; then
  useradd -r -m -d "$APP_DIR" -s /bin/bash "$APP_USER"
  usermod -aG docker "$APP_USER"
fi

# 6. Répertoires
echo "[6/9] Création des répertoires…"
mkdir -p "$APP_DIR" "$LOG_DIR"
chown -R "$APP_USER":"$APP_USER" "$APP_DIR" "$LOG_DIR"

# 7. Pare-feu UFW
echo "[7/9] Configuration du pare-feu UFW…"
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable
echo "  UFW activé. Ports ouverts : SSH (22), HTTP (80), HTTPS (443)"

# 8. Fail2ban
echo "[8/9] Activation de fail2ban…"
systemctl enable fail2ban
systemctl start fail2ban

# 9. Répertoire challenge Let's Encrypt
echo "[9/9] Préparation du répertoire Let's Encrypt…"
mkdir -p /var/www/certbot
chown www-data:www-data /var/www/certbot

echo ""
echo "✅ Setup VPS terminé."
echo ""
echo "PROCHAINE ÉTAPE : Lancez 02-premier-deploiement.sh"
echo ""
echo "⚠️  N'oubliez pas de configurer le DNS chez LWS avant de continuer"
echo "   (voir CHECKLIST-DEPLOIEMENT.md, section DNS)"
