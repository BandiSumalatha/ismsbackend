import express from "express";
import genericNameController from "../controllers/generic.controller.js";
const router = express.Router();

router.get("/", genericNameController.getGenericNames);

export default router;