import express from "express"
import imprestProductsController from "../controllers/imprest.product.controller.js";
import validate from "../middlewares/user.auth.js";
const router = express.Router();

router.get("/", validate, imprestProductsController.getImprestProducts);
router.get("/fetch", imprestProductsController.fetchImprestProducts);
router.post("/", validate, imprestProductsController.createImprestProduct);
router.get("/:id", validate, imprestProductsController.getImprestProductById);
router.put("/:id", imprestProductsController.updateImprestProduct);
router.delete("/:id", validate, imprestProductsController.deleteImprestProduct);
export default router;
