import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/responseHandler";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  console.error("Error:", err);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    return errorResponse(res, 404, "Resource not found", err);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return errorResponse(res, 400, "Duplicate field value entered", err);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val: any) => val.message).join(", ");
    return errorResponse(res, 400, message, err);
  }

  return errorResponse(res, error.statusCode || 500, error.message || "Internal Server Error", err);
};