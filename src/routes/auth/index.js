import { Router } from "express";
import UserController from "../../controllers/user.js";
import mapUser from "../../helpers/mapUser.js";

const router = Router();

// Базовый маршрут для проверки работы API

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await UserController.register(email, password);

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
      })
      .json({
        status: "success",
        message: "User created",
        user: mapUser(user),
      });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: err.message || "Unknown error" });
  }
});
router.post("/login", async (req, res) => {
  console.log("request");
  try {
    const { email, password } = req.body;
    console.log({ email, password });
    const { user, token } = await UserController.login(email, password);
    console.log({ user, token });
    res.status(200);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
      })
      .send({
        status: "success",
        message: "User logged in",
        user: mapUser(user),
      });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: err.message || "Unknown error" });
  }
});
router.post("/logout", (req, res) => {
  res
    .cookie("token", "", { httpOnly: true, maxAge: 0 })
    .send({ status: "success", message: "User logged out" });
});

router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Токен не найден",
      });
    }

    const user = await UserController.getUserByToken(token);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Пользователь не найден",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Информация о пользователе получена",
      user: mapUser(user),
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message || "Неизвестная ошибка",
    });
  }
});

export default router;
