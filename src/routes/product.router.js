import express from "express";
import productController from "../controllers/product.controller.js";
import validate from "../middlewares/user.auth.js";
const router = express.Router();

router.post("/", validate, productController.createProduct);
router.get("/", validate, productController.getAllProducts);
router.put("/:id", validate, productController.updateProduct);
router.delete("/:id", validate, productController.deleteProduct);
router.get("/:id", validate, productController.getOneProduct);

export default router; 