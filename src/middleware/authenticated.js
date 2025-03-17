import User from "../models/User.js";
import TokenHelper from "../helpers/token.js";

export default async function (req, res, next) {
  console.log(req.cookies);
  console.log(req.cookies.token);
  if (!req.cookies.token) {
    console.log("НЕТ ТОКЕНА!!");
    return res.status(401).send({
      status: "error",
      message: "Authentication token not provided",
    });
  }
  try {
    const token = TokenHelper.verifyToken(req.cookies.token);
    const user = await User.findOne({ _id: token.id });

    if (!user) {
      return res.status(401).send({
        status: "error",
        message: "Authenticated user not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({
      status: "error",
      message: "Invalid authentication token",
    });
  }
}
