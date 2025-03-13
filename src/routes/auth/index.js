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
  try {
    const { email, password } = req.body;
    const { user, token } = await UserController.login(email, password);

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

export default router;
