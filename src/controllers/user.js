import bcrypt from "bcrypt";

import User from "../models/User.js";
import TokenHelper from "../helpers/token.js";
import roles from "../constants/roles.js";

export default {
  register,
  login,
  getUsers,
  getUserById,
  getRoles,
  deleteUser,
  updateUser,
  getUserByToken,
};

async function login(email, password) {
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) throw new Error("User not found");

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error("Invalid password");

  const token = TokenHelper.generateToken({ id: user.id });

  return { user, token };
}
async function register(email, password) {
  {
    // validation
    if (!email || !password) throw new Error("Email and password are required");

    if (password.length < 7)
      throw new Error("Password must be at least 7 characters long");
  }
  {
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });

  const token = TokenHelper.generateToken({ id: user.id });

  return { user, token };
}
async function getUsers() {
  return await User.find();
}
async function getUserById(id) {
  return await User.findById();
}
function getRoles() {
  return Object.entries(roles).map(([key, value]) => ({
    id: value,
    name: key,
  }));
}
async function deleteUser(id) {
  return await User.deleteOne({ _id: id });
}
async function updateUser(id, user) {
  return await User.findByIdAndUpdate(id, user, { returnDocument: "after" });
}
async function getUserByToken(token) {
  try {
    const decoded = TokenHelper.verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    return user;
  } catch (err) {
    throw new Error("Недействительный токен");
  }
}
// delete user

// edit roles
