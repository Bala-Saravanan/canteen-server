import { Response } from "express";
import { AuthRequest } from "./../../../middlewares/auth.middleware";
import { getUserProfile } from "./../services";
import { sendSuccess, sendError } from "./../../../utils/response";

export const getProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      sendError(res, "Unauthorized", 401);
      return;
    }
    const profile = await getUserProfile(userId);
    sendSuccess(res, "Profile fetched successfully", profile);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch profile";
    sendError(res, message, 400);
  }
};
