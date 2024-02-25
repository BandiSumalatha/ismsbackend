import express from "express";
import productFormController from "../controllers/productform.controller.js";
const router = express.Router();

router.get("/", productFormController.getProductFrom);

export default router;