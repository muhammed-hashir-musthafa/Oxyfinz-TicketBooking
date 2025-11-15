import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import {  JwtPayload } from "../types";
import config from "../config/config";
import { errorResponse } from "../utils/responseHandler";



declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return errorResponse(res, 401, "Access denied. No token provided.");
    }

    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    const user = await User.findById(decoded.id);

    if (!user) {
      return errorResponse(res, 401, "Invalid token. User not found.");
    }

    req.user = {
      id: (user._id as string).toString(),
      role: user.role,
    };

    return next();
  } catch (error) {
    console.error("Authentication error:", error);
    return errorResponse(res, 401, "Invalid token.", error);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return errorResponse(res, 401, "Access denied. Please authenticate.");
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse(res, 403, "Access denied. Insufficient permissions.");
    }

    return next();
  };
};