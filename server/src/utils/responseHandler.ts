import { Response } from "express";

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export const successResponse = (
  res: Response,
  message: string,
  data: Record<string, any> = {},
  pagination: Pagination | null = null
) => {
  const response = {
    success: true,
    message,
    data: {
      ...data,
      pagination: pagination
        ? {
            currentPage: pagination.currentPage,
            totalPages: pagination.totalPages,
            totalItems: pagination.totalItems,
          }
        : null,
    },
  };

  return res.status(200).json(response);
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  error: unknown = null
) => {
  const errMessage =
    error && typeof error === "object" && "message" in error
      ? (error as Error).message
      : error;

  return res.status(statusCode).json({
    status: statusCode,
    success: false,
    message,
    error: errMessage,
  });
};
