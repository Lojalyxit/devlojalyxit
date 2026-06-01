# /etc/nginx/sites-available/lojalyxit.com
# ─────────────────────────────────────────────────────────────────────────────
# ÉTAPE 1 : Activer ce fichier AVANT certbot (HTTP only)
#   sudo ln -s /etc/nginx/sites-available/lojalyxit.com /etc/nginx/sites-enabled/
#   sudo nginx -t && sudo systemctl reload nginx
#
# ÉTAPE 2 : Obtenir le certificat SSL
#   sudo certbot --nginx -d lojalyxit.com -d www.lojalyxit.com
#
# Certbot modifiera automatiquement ce fichier pour ajouter les blocs SSL.
# ─────────────────────────────────────────────────────────────────────────────

# ── Redirection HTTP → HTTPS ──────────────────────────────────────────────────
server {
    listen 80;
    listen [::]:80;
    server_name lojalyxit.com www.lojalyxit.com;

    # Challenge Let's Encrypt (ne pas toucher)
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

# ── HTTPS (renseigné/modifié par certbot) ────────────────────────────────────
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name lojalyxit.com www.lojalyxit.com;

    # Certificats Let's Encrypt (remplis par certbot)
    ssl_certificate     /etc/letsencrypt/live/lojalyxit.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lojalyxit.com/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;

    # Redirect www → non-www
    if ($host = www.lojalyxit.com) {
        return 301 https://lojalyxit.com$request_uri;
    }

    # En-têtes de sécurité
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    client_max_body_size 20M;

    # ── Static files Django (servis directement par Nginx) ──────────────────
    location /static/ {
        alias /opt/lojalyxit/backend/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }

    # ── Media files ──────────────────────────────────────────────────────────
    location /media/ {
        alias /opt/lojalyxit/backend/media/;
        expires 7d;
        add_header Cache-Control "public";
    }

    # ── API Django (/api/ et /admin/) ────────────────────────────────────────
    location ~ ^/(api|admin)/ {
        proxy_pass         http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_connect_timeout 10s;
    }

    # ── Assets Next.js (cache long terme) ───────────────────────────────────
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # ── Frontend Next.js (catch-all) ─────────────────────────────────────────
    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade           $http_upgrade;
        proxy_set_header   Connection        'upgrade';
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
    }

    # Compression gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript
               application/rss+xml application/atom+xml image/svg+xml;
}
