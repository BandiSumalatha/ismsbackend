import express from "express";
import updatePassController from "../controllers/passwordReset.controller.js";
const router = express.Router();

router.post("/", updatePassController.updatePassword);

export default router;