import { Request, Response } from "express";
import { registerUser, loginUser } from "./../services";
import { sendSuccess, sendError } from "./../../../utils/response";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      sendError(res, "Name, email, and password are required", 400);
      return;
    }
    const result = await registerUser({ name, email, password, role });
    res.cookie("token", result.token, COOKIE_OPTIONS);
    sendSuccess(res, "Registration successful", result.user, 201);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Registration failed";
    sendError(res, message, 400);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      sendError(res, "Email and password are required", 400);
      return;
    }
    const result = await loginUser({ email, password });
    res.cookie("token", result.token, COOKIE_OPTIONS);
    sendSuccess(res, "Login successful", result.user);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    sendError(res, message, 401);
  }
};

export const logout = (_req: Request, res: Response): void => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  sendSuccess(res, "Logged out successfully");
};
