import express from "express";
import PackUomController from "../controllers/pack.uom.controller.js";
const router = express.Router();

router.get("/", PackUomController.getPackUnitOfMeasure);

export default router;