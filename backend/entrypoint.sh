#!/bin/sh
set -e

echo "==> Migrations…"
python manage.py migrate --noinput

echo "==> Collectstatic…"
python manage.py collectstatic --noinput --clear

echo "==> Démarrage Gunicorn…"
exec gunicorn lojalyxit.wsgi:application \
  --bind 0.0.0.0:8000 \
  --workers "${GUNICORN_WORKERS:-3}" \
  --timeout 120 \
  --keep-alive 5 \
  --max-requests 1000 \
  --max-requests-jitter 100 \
  --access-logfile - \
  --error-logfile - \
  --log-level info
