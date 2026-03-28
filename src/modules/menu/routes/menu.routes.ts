import { Router } from "express";
import { getMenu, createMenu, updateMenu, deleteMenu } from "./../controllers";
import {
  authMiddleware,
  roleMiddleware,
} from "./../../../middlewares/auth.middleware";

const router = Router();

router.get("/", getMenu);
router.post("/", authMiddleware, roleMiddleware("admin"), createMenu);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateMenu);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteMenu);

export const menuRoutes = router;
