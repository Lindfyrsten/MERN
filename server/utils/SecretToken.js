import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const SecretToken = (email, userId, duration) => {
  const payload = {
    email,
    userId,
    duration,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
};

export default SecretToken;
