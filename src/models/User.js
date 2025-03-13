import mongoose from "mongoose";
import roles from "../constants/roles.js";

const UserSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: Number,
      enum: Object.values(roles),
      default: roles.USER,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
