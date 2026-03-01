import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const signAuthToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
      name: user.name
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
};

export const verifyAuthToken = (token) => {
  return jwt.verify(token, env.jwtSecret);
};

