# Production-ready Dockerfile
FROM node:18-alpine
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy rest of source
COPY . .

# Create data directory (will be overwritten by volume in production)
RUN mkdir -p data

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "server.js"]
