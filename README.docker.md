# Docker Setup for Books With Wilda

This document provides instructions for setting up and running the Books With Wilda application using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Services Overview

The docker-compose.yml file sets up the following services:

1. **NextJS Application** - The main Books With Wilda web application (using Bun runtime)
2. **Directus CMS** - Headless CMS for content management
3. **Flarum** - Modern, lightweight forum software for community discussions

## Getting Started

### 1. Configure Environment Variables

The default environment variables are provided in the `.env.docker` file. For production deployments, you should modify these values, especially the passwords and secrets.

```bash
# Copy the docker environment file (if not already present)
cp .env.docker .env
```

### 2. Build and Start the Services

```bash
# Build and start all services
docker-compose up -d

# To rebuild services when making changes to the code
docker-compose up -d --build
```

### 3. Access the Services

- **NextJS Application**: http://localhost:3000
- **Directus CMS**: http://localhost:8055
- **Flarum Forum**: http://localhost:8080

### 4. Default Admin Credentials

#### Directus CMS
- **Email**: admin@example.com
- **Password**: admin_secure_password

#### Flarum
- **Username**: admin
- **Email**: admin@example.com
- **Password**: flarum_admin_secure_password

## Data Persistence

All data is persisted using Docker volumes:

- **directus-db-data**: PostgreSQL data for Directus
- **directus-uploads**: Uploaded files in Directus
- **directus-extensions**: Directus extensions
- **flarum-db-data**: MariaDB data for Flarum
- **flarum-data**: Flarum assets and user data
- **flarum-extensions**: Flarum extensions

## Environment Variables

### NextJS Application
- `AUTH0_CLIENT_ID`: Auth0 client ID
- `AUTH0_DOMAIN`: Auth0 domain
- `AUTH0_CLIENT_SECRET`: Auth0 client secret
- `AUTH0_CALLBACK_URL`: Auth0 callback URL
- `AUTH0_SECRET`: Auth0 secret
- `APP_BASE_URL`: Base URL for the application

### Directus CMS
- `DIRECTUS_KEY`: Random key for Directus
- `DIRECTUS_SECRET`: Random secret for Directus
- `DIRECTUS_DB_PASSWORD`: Password for Directus database
- `DIRECTUS_ADMIN_EMAIL`: Email for Directus admin account
- `DIRECTUS_ADMIN_PASSWORD`: Password for Directus admin account
- `DIRECTUS_PUBLIC_URL`: Public URL for Directus

### Flarum
- `FORUM_URL`: URL for Flarum 
- `FLARUM_DB_ROOT_PASSWORD`: Root password for MariaDB
- `FLARUM_DB_PASSWORD`: Password for Flarum database user
- `FLARUM_ADMIN_PASSWORD`: Password for Flarum admin account
- `FLARUM_ADMIN_EMAIL`: Email for Flarum admin account
- `FLARUM_TITLE`: Site title for Flarum

## Stopping the Services

```bash
# Stop all services but keep volumes
docker-compose down

# Stop all services and remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

## Development Workflow

For development, you might want to run only the databases and work with the NextJS application locally:

```bash
# Run only the databases and services
docker-compose up -d directus directus-db flarum flarum-db

# Run NextJS locally
bun run dev
```

## Troubleshooting

### Logs

To check logs for a specific service:

```bash
docker-compose logs -f nextjs
docker-compose logs -f directus
docker-compose logs -f flarum
```

### Rebuilding a Specific Service

If you need to rebuild a specific service:

```bash
docker-compose up -d --build nextjs
```

### Restarting a Service

```bash
docker-compose restart nextjs
```