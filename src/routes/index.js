import { Router } from "express";
import authRoutes from "./auth/index.js";
import adminRoutes from "./admin/index.js";
import postRoutes from "./posts/index.js";
import {
  AUTH_ROUTES_PREFIX,
  ADMIN_ROUTES_PREFIX,
  POST_ROUTES_PREFIX,
} from "../constants/routes.js";
const router = Router();

// Базовый маршрут для проверки работы API
router.get("/", (req, res) => {
  res.json({ message: "API работает! Watch режим активен!" });
});

router.use(`${AUTH_ROUTES_PREFIX}`, authRoutes);
router.use(`${ADMIN_ROUTES_PREFIX}`, adminRoutes);
router.use(`${POST_ROUTES_PREFIX}`, postRoutes);
export default router;
