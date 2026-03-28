import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "../utils/JWT";
import { sendError } from "../utils/response";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      sendError(res, "Access denied. No token provided.", 401);
      return;
    }
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    sendError(res, "Invalid or expired token.", 401);
  }
};

export const roleMiddleware = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      sendError(res, "Access denied. Insufficient permissions.", 403);
      return;
    }
    next();
  };
};
