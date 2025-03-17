import jwt from "jsonwebtoken";
const sign = "test";

export default { generateToken, verifyToken };

function verifyToken(token) {
  return jwt.verify(token, sign);
}

function generateToken(data) {
  return jwt.sign(data, sign, { expiresIn: "30d" });
}
