import { Router } from "express";
import {
  placeOrder,
  myOrders,
  allOrders,
  patchOrderStatus,
} from "./../controllers";
import {
  authMiddleware,
  roleMiddleware,
} from "./../../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("user"), placeOrder);
router.get("/my-orders", authMiddleware, roleMiddleware("user"), myOrders);
router.get("/", authMiddleware, roleMiddleware("admin"), allOrders);
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  patchOrderStatus,
);

export const orderRoutes = router;
