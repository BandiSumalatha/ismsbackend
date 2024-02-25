import express from "express";
import brandController from "../controllers/brand.controller.js";
const router = express.Router();

router.get("/", brandController.getBrand);
router.post("/", brandController.createBrand);
router.put("/:id", brandController.updateBrand);
router.delete("/:id", brandController.deleteBrand);
router.get("/:id", brandController.getOneBrand);

export default router;