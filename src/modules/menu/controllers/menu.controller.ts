import { Request, Response } from "express";
import {
  getAllMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "./../services";
import { sendSuccess, sendError } from "./../../../utils/response";

export const getMenu = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await getAllMenuItems();
    sendSuccess(res, "Menu fetched successfully", items);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch menu";
    sendError(res, message, 400);
  }
};

export const createMenu = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, price, category, isAvailable } = req.body;
    if (!name || price === undefined || !category) {
      sendError(res, "Name, price, and category are required", 400);
      return;
    }
    const item = await createMenuItem({ name, price, category, isAvailable });
    sendSuccess(res, "Menu item created successfully", item, 201);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create menu item";
    sendError(res, message, 400);
  }
};

export const updateMenu = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const item = await updateMenuItem(id, req.body);
    sendSuccess(res, "Menu item updated successfully", item);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update menu item";
    sendError(res, message, 400);
  }
};

export const deleteMenu = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    await deleteMenuItem(id);
    sendSuccess(res, "Menu item deleted successfully");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete menu item";
    sendError(res, message, 400);
  }
};
