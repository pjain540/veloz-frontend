import express from "express";
import authController from "./auth.controller";
import { isAdmin } from "../../shared/middlewares/auth.middleware";

const router = express.Router();

router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.get("/me", isAdmin, authController.me);
router.post("/setup", authController.setup); // One-time admin creation

export default router;
