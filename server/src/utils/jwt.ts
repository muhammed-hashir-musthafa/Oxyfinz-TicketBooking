import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config/config";

const jwtSecret = config.jwt.secret as string; // ensure it's a string

export const generateToken = (payload: {
  id: string;
  email: string;
  role: string;
}) => {
  const options: SignOptions = {
    expiresIn: config.jwt.expiresIn as any,
  };

  return jwt.sign(payload, jwtSecret, options);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtSecret);
};
