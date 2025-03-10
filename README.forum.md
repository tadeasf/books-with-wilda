# Flarum Forum Integration

This project uses Flarum, a modern, lightweight forum software, as its community platform.

## Overview

Flarum is a simple, fast, and mobile-friendly forum software that provides a clean and intuitive user experience. It's designed to be easy to set up and use, while still offering powerful features through its extensive extension ecosystem.

## Configuration

The Flarum instance is configured via environment variables in the `.env` file and docker-compose.yml:

```
FORUM_URL=http://localhost:8080                     # URL where Flarum is accessible
NEXT_PUBLIC_FORUM_URL=http://localhost:8080         # Public URL for client-side access
FLARUM_DB_ROOT_PASSWORD=flarum_root_secure_password # Root password for MariaDB
FLARUM_DB_PASSWORD=flarum_db_secure_password        # Database user password
FLARUM_ADMIN_PASSWORD=flarum_admin_secure_password  # Admin password for Flarum
FLARUM_ADMIN_EMAIL=admin@example.com                # Admin email
FLARUM_TITLE=Books with Wilda Forum                 # Title of your forum
```

## Running Flarum

Flarum is dockerized and will start automatically as part of the docker-compose configuration. You don't need to run any separate scripts or commands.

```bash
# Start all services including Flarum
docker-compose up -d
```

## Accessing Flarum

Once the docker-compose stack is running, you can access Flarum at:

- http://localhost:8080

## Admin Login

You can log in to the Flarum admin panel using:

- Username: admin
- Password: The value of FLARUM_ADMIN_PASSWORD in your .env file

## Auth0 Integration

Flarum can be integrated with Auth0 for unified login across the Books with Wilda platform. This requires installing and configuring two Flarum extensions.

### Required Extensions

1. **FoF OAuth** (Friends of Flarum OAuth) - Base OAuth provider
2. **Generic OAuth** - Extension to connect to Auth0

### Installation Steps

Follow the detailed instructions in the [AUTH0_FLARUM_SETUP.md](./AUTH0_FLARUM_SETUP.md) file to:

1. Configure your Auth0 application
2. Install the required Flarum extensions
3. Set up the OAuth connection in Flarum admin
4. Test the Auth0 login

### Auth0 Environment Variables

The following Auth0 variables are needed for the integration:

```
AUTH0_FLARUM_CLIENT_ID=${AUTH0_CLIENT_ID}
AUTH0_FLARUM_CLIENT_SECRET=${AUTH0_CLIENT_SECRET}
AUTH0_FLARUM_CALLBACK_URL=http://localhost:8080/auth/auth0/callback
```

By default, these variables reuse the same Auth0 application as the main Next.js site, but you can create a separate Auth0 application if desired.

## Customization

Flarum can be customized through its admin panel and extensions. The Flarum data and extensions are persisted through Docker volumes:

- `flarum-data`: Stores assets and user data
- `flarum-extensions`: Stores installed extensions
- `flarum-composer`: Stores composer dependencies
- `flarum-config`: Stores Flarum configuration

## Installing Additional Extensions

To install additional Flarum extensions, you can access the Flarum container's shell:

```bash
docker exec -it books-with-wilda_flarum_1 sh
```

Once inside the container, navigate to the Flarum directory and use Composer to install extensions:

```bash
cd /flarum/app
composer require vendor/extension-name
```

## Troubleshooting

If you encounter issues with Flarum:

1. Check the Docker logs: `docker-compose logs flarum`
2. Ensure the database is properly connected: `docker-compose logs flarum-db`
3. Verify that the environment variables are correctly set in your .env file
4. Enable debug mode by setting `FLARUM_DEBUG=true` in your .env file

For more information, refer to the [Flarum documentation](https://docs.flarum.org/) 