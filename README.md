# WordPress Playground - Coolify Deployment

A self-hosted WordPress Playground instance designed for deployment on [Coolify](https://coolify.io/). This repository contains pre-built WordPress Playground WASM files and a Docker configuration optimized for Coolify's deployment workflow.

## What is WordPress Playground?

[WordPress Playground](https://wordpress.org/playground/) is an innovative project that runs WordPress entirely in the browser using WebAssembly (WASM). It allows users to:

- Test WordPress without any server setup
- Try themes and plugins instantly
- Share WordPress configurations via blueprints
- Develop and debug WordPress in a sandboxed environment

## Features

- **Self-hosted WordPress Playground** - Run your own instance instead of relying on wordpress.org
- **Multiple WordPress versions** - Includes WP 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, beta, and nightly builds
- **Coolify-ready** - Optimized Dockerfile for seamless Coolify deployment
- **Debug-friendly** - Includes useful debugging tools and PHP error logging

## Requirements

- [Coolify](https://coolify.io/) instance (self-hosted PaaS)
- Git repository connection in Coolify

## Deployment on Coolify

### Step 1: Add New Resource

1. Log in to your Coolify dashboard
2. Navigate to your project and click **+ Add Resource**
3. Select **Dockerfile** as the build pack

### Step 2: Configure the Repository

1. Connect this repository (or your fork) as the source
2. Coolify will automatically detect the `Dockerfile`

### Step 3: Configure Environment

No environment variables are required for basic deployment.

### Step 4: Deploy

Click **Deploy** and Coolify will:
1. Build the Docker image using the provided Dockerfile
2. Start the container with Apache serving the Playground files
3. Expose the application on your configured domain

## Project Structure

```
.
├── Dockerfile                      # Docker configuration for Coolify
└── dist/
    └── packages/
        └── playground/
            └── wasm-wordpress-net/  # Pre-built WordPress Playground files
                ├── index.html       # Main entry point
                ├── assets/          # JS, WASM, and CSS assets
                ├── wp-6.3/          # WordPress 6.3 static files
                ├── wp-6.4/          # WordPress 6.4 static files
                ├── wp-6.5/          # WordPress 6.5 static files
                ├── wp-6.6/          # WordPress 6.6 static files
                ├── wp-6.7/          # WordPress 6.7 static files
                ├── wp-6.8/          # WordPress 6.8 static files
                ├── wp-beta/         # WordPress beta static files
                ├── wp-nightly/      # WordPress nightly static files
                └── ...              # Other playground files
```

## Docker Configuration

The Dockerfile sets up:

- **Base image**: PHP 8.1 with Apache
- **Apache modules**: `mod_rewrite` and `mod_headers` enabled
- **WASM support**: Proper MIME type configuration for `.wasm` files
- **Debugging tools**: `procps`, `less`, `vim-tiny`, `iproute2`
- **PHP error logging**: Errors displayed in browser and logged to `/var/log/php_errors.log`

## Local Development

To run locally with Docker:

```bash
# Build the image
docker build -t wp-playground .

# Run the container
docker run -p 8080:80 wp-playground
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

## Updating WordPress Playground

To update to the latest WordPress Playground build:

1. Clone the [official WordPress Playground repository](https://github.com/WordPress/wordpress-playground)
2. Build the project following their documentation
3. Copy the contents of `dist/packages/playground/wasm-wordpress-net/` to this repository
4. Commit and push changes
5. Redeploy on Coolify

## Troubleshooting

### WASM files not loading

Ensure your browser supports WebAssembly. Most modern browsers do, but some corporate firewalls may block `.wasm` files.

### PHP errors

Check the PHP error log inside the container:

```bash
docker exec -it <container_id> cat /var/log/php_errors.log
```

### Permission issues

The Dockerfile automatically sets correct permissions. If you encounter issues, verify the files in `/var/www/html` are owned by `www-data`.

## Security Note

⚠️ **This configuration has PHP error display enabled for debugging purposes.** For production deployments, consider modifying the Dockerfile to disable `display_errors`.

## Resources

- [WordPress Playground Official Site](https://wordpress.org/playground/)
- [WordPress Playground GitHub](https://github.com/WordPress/wordpress-playground)
- [Coolify Documentation](https://coolify.io/docs/)

## License

WordPress Playground is licensed under GPLv2. See the [WordPress Playground repository](https://github.com/WordPress/wordpress-playground) for full license details.

