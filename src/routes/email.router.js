import express from "express";
import emailController from "../controllers/email.controller.js";

const router = express.Router();

router.get("/", emailController.GetEmail);
export default router;