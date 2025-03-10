# Базовый этап для обоих окружений
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# Этап разработки
FROM base AS development
RUN --mount=type=cache,target=/root/.npm \
    npm install
USER node
CMD ["npm", "run", "dev"]

# Этап production сборки
FROM base AS production
RUN --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .
# Устанавливаем wget для healthcheck
RUN apk add --no-cache wget
# Очистка npm кэша и ненужных файлов
RUN npm cache clean --force && \
    rm -rf /root/.npm/* /tmp/*
USER node
CMD ["npm", "start"] 