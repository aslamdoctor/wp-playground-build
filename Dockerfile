# Use a PHP + Apache image
FROM php:8.1-apache

# Enable apache rewrite and set wasm mime type
RUN a2enmod rewrite \
 && { echo 'AddType application/wasm .wasm'; } >> /etc/apache2/mods-available/mime.conf \
 && sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# Copy the built playground static files into the webroot
# Make sure you build the site so the path below exists in the repo
COPY dist/packages/playground/wasm-wordpress-net/ /var/www/html/

# Ensure permissions (optional, depends on your build artifacts)
RUN chown -R www-data:www-data /var/www/html

# Expose 80 internally (Coolify will proxy to the service)
EXPOSE 80

# default CMD for php:apache is fine; keep it
