FROM node:20-slim AS base


WORKDIR /app

# Copy package files first for better layer caching
COPY package.json ./

# Install dependencies including optional platform-specific ones
RUN npm install --include=optional
RUN npm install lightningcss

# Copy the rest of the application (node_modules excluded via .dockerignore)
COPY . .

# Set environment variables
ENV NEXT_PUBLIC_API_URL=https://millab-backend.up.railway.app
ENV NODE_ENV=production

# Enable SWC binary download for Linux x64 GNU
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_FORCE_DOWNLOAD_BINARY 1

# Build the application
RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "start"]