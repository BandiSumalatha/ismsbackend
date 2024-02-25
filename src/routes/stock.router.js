import express from "express"
import stockController from "../controllers/stock.controller.js";

const router = express.Router();

router.put("/:id", stockController.updateStockData);
router.get("/", stockController.getStockData);
export default router;
