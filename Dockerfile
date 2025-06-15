FROM node:20-slim AS base

# Declare build arguments yang akan diterima dari pendeploy-simple
ARG NEXT_PUBLIC_API_URL=https://millab-backend.up.railway.app
ARG NODE_ENV=production
ARG NEXT_TELEMETRY_DISABLED=1
ARG NEXT_FORCE_DOWNLOAD_BINARY=1

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json ./

# Install dependencies including optional platform-specific ones
RUN npm install --include=optional
RUN npm install lightningcss

# Copy the rest of the application (node_modules excluded via .dockerignore)
COPY . .

# Set environment variables from build args
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}
ENV NEXT_FORCE_DOWNLOAD_BINARY=${NEXT_FORCE_DOWNLOAD_BINARY}

# Build the application
RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "start"]