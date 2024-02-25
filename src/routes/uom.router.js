import express from "express";
import UnitOfMeasure from "../controllers/uom.controller.js";
const router = express.Router();

router.get("/", UnitOfMeasure.getUom);

export default router;