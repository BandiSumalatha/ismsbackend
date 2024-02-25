import express from "express";
import authController from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", authController.Login);
router.post("/register", authController.Register);
router.post("/userdata", authController.userData);
router.post("/forgot-password", authController.ForgotPassword);
router.post("/change-password", authController.ChangePassword);
router.post("/otp-validation", authController.OTPValidation);
export default router;