import express from "express";
import { handleStripeWebhook } from "./modules/orders/order.controller";

const router = express.Router();

router.post("/stripe/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

export default router;