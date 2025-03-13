import { Router } from "express";
import UserController from "../../controllers/user.js";
import mapUser from "../../helpers/mapUser.js";

const router = Router();
router.get("/roles", (req, res) => {
  const roles = UserController.getRoles();
  res.send({ data: roles });
});
router.get("/users", async (req, res) => {
  const users = await UserController.getUsers();
  res.send({ data: users.map(mapUser) });
});
router.get("/users/:id", async (req, res) => {
  const user = await UserController.getUserById(req.params.id);
  res.send({ data: mapUser(user) });
});
router.delete("/users/:id", async (req, res) => {
  const user = await UserController.deleteUser(req.params.id);
  res.send({ status: "success" });
});
router.patch("/users/:id", async (req, res) => {
  const user = await UserController.updateUser(req.params.id, {
    role: req.body.role,
  });
  res.send({ data: mapUser(user) });
});

export default router;
