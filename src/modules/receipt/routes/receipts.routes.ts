import { Router } from "express";
import { createReceipt, getReceipt, listReceipts } from "./../controllers";
import {
  authMiddleware,
  roleMiddleware,
} from "./../../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("admin"), createReceipt);
router.get("/", authMiddleware, roleMiddleware("admin"), listReceipts);
router.get("/:orderId", authMiddleware, getReceipt);

export const receiptRoutes = router;
