import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";
import { setupMiddleware } from "./src/middleware/index.js";
import routes from "./src/routes/index.js";
// Загрузка переменных окружения
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI не указан в переменных окружения");
  process.exit(1);
}

// Настройка middleware
setupMiddleware(app);

// Подключение маршрутов
app.use("/", routes);

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Что-то пошло не так!" });
});

// Подключение к базе данных и запуск сервера
const startServer = async () => {
  try {
    await connectDB(MONGODB_URI);
    console.log("MongoDB подключена:", MONGODB_URI.split("@")[1]);

    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error("Ошибка при запуске сервера:", error);
    process.exit(1);
  }
};

startServer();
