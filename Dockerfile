# runtime-only Dockerfile (debug friendly)
FROM php:8.1-apache

# useful debugging tools (small) + keep image tidy
RUN apt-get update && apt-get install -y --no-install-recommends \
    procps less vim-tiny iproute2 ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# enable mod_rewrite and wasm mime type; allow .htaccess
RUN a2enmod rewrite headers \
 && { echo 'AddType application/wasm .wasm'; } >> /etc/apache2/mods-available/mime.conf \
 && sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# Show PHP errors in browser (DEBUG ONLY — remove after fix)
# Also log errors to /var/log/php_errors.log
RUN { \
    echo 'display_errors=On'; \
    echo 'display_startup_errors=On'; \
    echo 'error_reporting=E_ALL'; \
    echo 'log_errors=On'; \
    echo 'error_log=/var/log/php_errors.log'; \
} >> /usr/local/etc/php/php.ini

# Copy the prebuilt playground files into webroot
COPY dist/packages/playground/wasm-wordpress-net/ /var/www/html/

# Ensure apache can read files and permissions are sane
RUN chown -R www-data:www-data /var/www/html \
 && find /var/www/html -type d -exec chmod 755 {} \; \
 && find /var/www/html -type f -exec chmod 644 {} \;

EXPOSE 80
