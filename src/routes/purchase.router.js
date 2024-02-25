import express from "express"
import purchaseController from "../controllers/purchase.controller.js";
import validate from "../middlewares/user.auth.js";

const router = express.Router();

router.post("/initiate", purchaseController.initiateProductPurchase);
router.post("/accept", purchaseController.receiveProductPurchase);
router.post("/shipment", purchaseController.shipProductPurchase);
router.post("/delivery", purchaseController.deliverProductPurchase);
router.get("/", purchaseController.fetchProductPurchase);
export default router;
