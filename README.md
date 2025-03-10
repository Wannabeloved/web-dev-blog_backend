# Web Dev Backend

Бэкенд для веб-приложения на Express.js с MongoDB.

## 🛠 Технологии

- Node.js 20
- Express.js 5.0
- MongoDB (через Mongoose)
- Docker & Docker Compose
- ES Modules

## 📋 Требования

- Docker Engine 24.0+
- Docker Compose v2.20.0+
- Node.js 20.x (для локальной разработки без Docker)

## 🚀 Быстрый старт

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd <repository-path>
```

### 2. Настройка окружения

Создайте файл `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

Отредактируйте `.env` файл, указав ваши значения:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@<your-cluster>.mongodb.net/<dbname>
```

### 3. Запуск приложения

#### Режим разработки (с hot-reload)

```bash
# Запуск в режиме разработки
docker compose watch
```

#### Production режим

```bash
# Запуск в интерактивном режиме
docker compose up --build

# Запуск в фоновом режиме
docker compose up -d --build
```

#### Проверка работы приложения

1. Убедитесь, что контейнер запущен:

```bash
docker compose ps
```

2. Проверьте логи на наличие ошибок:

```bash
docker compose logs -f
```

3. Проверьте доступность приложения:

```bash
curl http://localhost:3000
```

Если приложение не отвечает, проверьте:

- Правильность значения PORT в .env файле
- Наличие ошибок в логах
- Статус контейнера через `docker compose ps`
- Доступность порта через `netstat -an | grep 3000`

## 💻 Разработка

### Полезные Docker Compose команды

- Просмотр логов:

```bash
docker compose logs -f
```

- Остановка контейнеров:

```bash
docker compose down
```

### Watch режим

В режиме разработки автоматически отслеживаются изменения:

#### Автоматическая синхронизация (без перезапуска):

- `./src/**/*` - изменения исходного кода
  - Игнорируются: `*.test.js`, `*.spec.js`

#### Синхронизация с перезапуском:

- `main.js` - основной файл приложения
- `.env` - переменные окружения

#### Автоматическая пересборка (rebuild):

При изменении следующих файлов происходит полная пересборка контейнера:

- `package.json` - зависимости проекта
- `package-lock.json` - лок-файл зависимостей
- `Dockerfile` - конфигурация образа
- `compose.yaml` - основная конфигурация Docker Compose
- `compose.override.yaml` - конфигурация для разработки

### Отладка

1. Приложение доступно на порту 3000 (или указанном в .env)
2. Отладка Node.js доступна на порту 9229
3. Для отладки в Chrome DevTools откройте: chrome://inspect

### Структура проекта

```
.
├── src/
│   ├── config/         # Конфигурация приложения
│   ├── controllers/    # Контроллеры
│   ├── middleware/     # Middleware
│   ├── models/        # Mongoose модели
│   └── routes/        # Маршруты API
├── .env               # Переменные окружения
├── .env.example       # Пример переменных окружения
├── compose.yaml       # Docker Compose для production
├── compose.override.yaml  # Docker Compose для разработки
├── Dockerfile         # Multi-stage Dockerfile
├── main.js           # Точка входа приложения
└── package.json      # Зависимости и скрипты
```

### Скрипты npm

- `npm start` - запуск в production режиме
- `npm run dev` - запуск в режиме разработки с watch

## 🔒 Безопасность

1. Не коммитьте `.env` файл
2. Используйте безопасные пароли для MongoDB
3. В production всегда используйте HTTPS
4. Регулярно обновляйте зависимости

## 📝 Рекомендации по разработке

1. Следуйте структуре проекта
2. Используйте ES Modules (`import`/`export`)
3. Добавляйте комментарии к API endpoints
4. Обрабатывайте ошибки через middleware

## 🐛 Отладка

### Просмотр логов контейнера

```bash
# Все логи
docker compose logs -f

# Логи конкретного сервиса
docker compose logs -f app
```

### Доступ к контейнеру

```bash
docker compose exec app sh
```

## 📦 Деплой

Для production используйте:

```bash
docker compose -f compose.yaml up -d --build
```

## 🤝 Содействие

1. Форкните репозиторий
2. Создайте ветку для фичи (`git checkout -b feature/amazing-feature`)
3. Закоммитьте изменения (`git commit -m 'Add amazing feature'`)
4. Пушните ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request
