#!/bin/bash

set -e

VPS_USER="root"
VPS_HOST="72.61.112.137"
PROJECT_DIR="/var/www/keen.sardarit.cloud"

echo ""
echo "╔══════════════════════════════════════╗"
echo "║        Deploying to VPS...           ║"
echo "╚══════════════════════════════════════╝"
echo ""
echo "→ Host:    $VPS_HOST"
echo "→ User:    $VPS_USER"
echo "→ Project: $PROJECT_DIR"
echo ""
echo "Connecting to VPS..."

ssh $VPS_USER@$VPS_HOST bash << EOF
  set -e

  echo ""
  echo "✔ Connected to VPS"
  echo ""

  echo "──────────────────────────────────────"
  echo " [1/6] Pulling latest code from GitHub"
  echo "──────────────────────────────────────"
  cd $PROJECT_DIR
  git fetch origin
  git reset --hard origin/main
  echo "✔ Code updated to: \$(git log -1 --pretty=format:'%h - %s (%an, %ar)')"

  echo ""
  echo "──────────────────────────────────────"
  echo " [2/6] Installing PHP dependencies"
  echo "──────────────────────────────────────"
  composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev
  echo "✔ Composer dependencies installed"

  echo ""
  echo "──────────────────────────────────────"
  echo " [3/6] Installing Node dependencies & building assets"
  echo "──────────────────────────────────────"
  npm ci
  npm run build
  echo "✔ Assets built successfully"

  echo ""
  echo "──────────────────────────────────────"
  echo " [4/6] Running database migrations"
  echo "──────────────────────────────────────"
  php artisan migrate --force
  echo "✔ Migrations completed"

  echo ""
  echo "──────────────────────────────────────"
  echo " [5/6] Optimizing Laravel"
  echo "──────────────────────────────────────"
  php artisan optimize
  echo "✔ Laravel optimized"

  echo ""
  echo "──────────────────────────────────────"
  echo " [6/6] Adding permissions"
  echo "──────────────────────────────────────"

  chown -R nginx:nginx $PROJECT_DIR/storage
  chown -R nginx:nginx $PROJECT_DIR/bootstrap/cache

  chmod -R 775 $PROJECT_DIR/storage
  chmod -R 775 $PROJECT_DIR/bootstrap/cache

  echo "✔ Permissions fixed"

  echo ""
  echo "╔══════════════════════════════════════╗"
  echo "║     ✓ Deployment Successful!         ║"
  echo "╚══════════════════════════════════════╝"
  echo ""
  echo "→ Deployed at: \$(date)"
  echo "→ Commit: \$(git log -1 --pretty=format:'%h - %s')"
  echo ""
EOF
