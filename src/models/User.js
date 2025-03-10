import mongoose from "mongoose";
import roles from "../../constants/roles";

const UserSchema = mongoose.Schema(
  {
    email: String,
    password: String,
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
