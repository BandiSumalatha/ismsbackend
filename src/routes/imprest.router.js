import express from "express";
import imprestController from "../controllers/imprest.controller.js";
import validate from "../middlewares/user.auth.js";
const router = express.Router();

router.get("/all", validate, imprestController.fetchAllImprests)
router.post("/", validate, imprestController.createImprest);
router.get("/", validate, imprestController.getImprests);
router.put("/:id", validate, imprestController.updateImprest);
router.get("/:id", validate, imprestController.getOneImprest);
router.delete("/:id", validate, imprestController.deleteImprest);

export default router;
