import express from "express";
import motioncontroller from "../controllers/motionalerts.controller.js";
const router = express.Router();

router.post("/", motioncontroller.handleMotionAlert);
router.get("/", motioncontroller.fetchCamersAlerts);
router.get("/alerts", motioncontroller.fetchAlerts);
router.post("/objectDetected", motioncontroller.handleObjectDetectionAlert);
router.get("/objectAlerts", motioncontroller.fetchObjectAlerts);
router.post("/objectDetectedAction", motioncontroller.handleObjectDetectionAction);

export default router;