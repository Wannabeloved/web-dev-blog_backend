import { Router } from "express";

const router = Router();

// Базовый маршрут для проверки работы API
router.get("/", (req, res) => {
  res.json({ message: "API работает! Watch режим активен!" });
});

// Маршрут для проверки watch режима
router.get("/time", (req, res) => {
  const now = new Date();
  res.json({
    message: "Watch режим работает! Это обновленная версия ответа",
    time: {
      iso: now.toISOString(),
      local: now.toLocaleString("ru-RU"),
      unix: now.getTime(),
    },
    uptime: process.uptime(),
  });
});

// Тестовый маршрут для проверки hot reload
router.get("/test", (req, res) => {
  res.json({
    message: "Этот маршрут добавлен для проверки hot reload",
    timestamp: Date.now(),
  });
});

export default router;
