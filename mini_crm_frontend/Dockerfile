## Stage 1(builder): build deps
FROM node:22-alpine AS builder

## upgrade alpine to stable LTS
RUN apk update && apk upgrade --no-cache

## Chnage from root to app
WORKDIR /app

## Copy package for dep installation
COPY package*.json ./

RUN npm install --legacy-peer-deps

## Copy rest of the app
COPY ./ ./

RUN npm run build

## Stage 2(runner)
FROM node:22-alpine as runner
RUN apk update && apk upgrade --no-cache

WORKDIR /app

ENV NODE_ENV=production

## Copy built deps from builder stage
COPY --from=builder /app/package*.json ./

# Install only production deps (no devDeps)
RUN npm install --omit=dev

COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public

EXPOSE 5173

CMD [ "npm", "run", "start" ]