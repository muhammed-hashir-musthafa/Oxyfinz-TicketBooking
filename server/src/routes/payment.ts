import express from "express";
import { createPaymentOrder, verifyPayment } from "../controllers/payment";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

// Protected routes
router.use(authenticate);

router.post("/create-order", createPaymentOrder);
router.post("/verify", verifyPayment);

export default router;