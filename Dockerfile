# Use the latest official Bun image
FROM oven/bun:latest AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables needed at build time
ARG AUTH0_CLIENT_ID
ARG AUTH0_DOMAIN
ARG AUTH0_CLIENT_SECRET
ARG AUTH0_CALLBACK_URL
ARG AUTH0_SECRET
ARG APP_BASE_URL

# Set environment variables for build time
ENV AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID}
ENV AUTH0_DOMAIN=${AUTH0_DOMAIN}
ENV AUTH0_CLIENT_SECRET=${AUTH0_CLIENT_SECRET}
ENV AUTH0_CALLBACK_URL=${AUTH0_CALLBACK_URL}
ENV AUTH0_SECRET=${AUTH0_SECRET}
ENV APP_BASE_URL=${APP_BASE_URL}
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN bun run build

# Production image
FROM base AS runner
WORKDIR /app

# Set environment for production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user
RUN addgroup --system --gid 1001 bunjs && \
    adduser --system --uid 1001 nextapp

# Copy necessary files from builder, checking if directories exist before copying
COPY --from=builder --chown=nextapp:bunjs /app/.next ./.next
COPY --from=builder --chown=nextapp:bunjs /app/node_modules ./node_modules
COPY --from=builder --chown=nextapp:bunjs /app/package.json ./package.json

# Only copy public directory if it exists
RUN mkdir -p ./public
COPY --from=builder --chown=nextapp:bunjs /app/public ./public 2>/dev/null || true

# Set the correct permissions
USER nextapp

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "start"]