import { Response } from "express";

export const sendSuccess = (
  res: Response,
  message: string,
  data?: unknown,
  statusCode: number = 200,
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined && { data }),
  });
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 500,
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
