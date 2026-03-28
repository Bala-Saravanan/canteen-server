import { Router } from "express";
import { authRoutes } from "./../modules/auth/routes";
import { userRoutes } from "./../modules/user/routes";
import { menuRoutes } from "./../modules/menu/routes";
import { orderRoutes } from "./../modules/order/routes";
import { receiptRoutes } from "./../modules/receipt/routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/menu", menuRoutes);
router.use("/order", orderRoutes);
router.use("/receipt", receiptRoutes);

export const routes = router;
