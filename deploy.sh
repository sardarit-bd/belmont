#!/bin/bash
set -e

VPS_USER="root"
VPS_HOST="72.61.112.137"
PROJECT_DIR="/var/www/keen.sardarit.cloud"
PHP_USER="nginx"
PHP_GROUP="nginx"

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
echo " [1/9] Pulling latest code from GitHub"
echo "──────────────────────────────────────"
cd $PROJECT_DIR
git fetch origin
git reset --hard origin/main
echo "✔ Code updated to: \$(git log -1 --pretty=format:'%h - %s (%an, %ar)')"

echo ""
echo "──────────────────────────────────────"
echo " [2/9] Installing PHP dependencies"
echo "──────────────────────────────────────"
export COMPOSER_ALLOW_SUPERUSER=1
composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev
echo "✔ Composer dependencies installed"

echo ""
echo "──────────────────────────────────────"
echo " [3/9] Handling Filament assets"
echo "──────────────────────────────────────"
php artisan filament:assets
echo "✔ Filament assets registered"

echo ""
echo "──────────────────────────────────────"
echo " [4/9] Installing Node dependencies & building assets"
echo "──────────────────────────────────────"
npm ci
npm run build
echo "✔ Assets built successfully"

echo ""
echo "──────────────────────────────────────"
echo " [5/9] Running database migrations"
echo "──────────────────────────────────────"
php artisan migrate --force
echo "✔ Migrations completed"

echo ""
echo "──────────────────────────────────────"
echo " [6/9] Optimizing Laravel"
echo "──────────────────────────────────────"
php artisan optimize
echo "✔ Laravel optimized"

echo ""
echo "──────────────────────────────────────"
echo " [7/9] Clearing caches"
echo "──────────────────────────────────────"
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear
echo "✔ Caches cleared"

echo ""
echo "──────────────────────────────────────"
echo " [8/9] Fixing permissions for main directories"
echo "──────────────────────────────────────"

# storage and bootstrap/cache must be writable
chown -R $PHP_USER:$PHP_GROUP $PROJECT_DIR/storage
chown -R $PHP_USER:$PHP_GROUP $PROJECT_DIR/bootstrap/cache
chmod -R 775 $PROJECT_DIR/storage
chmod -R 775 $PROJECT_DIR/bootstrap/cache

# public/build must be readable
chown -R $PHP_USER:$PHP_GROUP $PROJECT_DIR/public/build
chmod -R 755 $PROJECT_DIR/public/build

# ensure other critical directories are also readable/writable if needed
chown -R $PHP_USER:$PHP_GROUP $PROJECT_DIR/public
chown -R $PHP_USER:$PHP_GROUP $PROJECT_DIR/resources
chmod -R 755 $PROJECT_DIR/public
chmod -R 755 $PROJECT_DIR/resources

echo "✔ Permissions fixed for all directories"

echo ""
echo "──────────────────────────────────────"
echo " [9/9] Deployment completed"
echo "──────────────────────────────────────"
echo "✔ Deployment finished successfully"
echo ""
echo "→ Deployed at: \$(date)"
echo "→ Commit: \$(git log -1 --pretty=format:'%h - %s')"
echo ""
EOF
