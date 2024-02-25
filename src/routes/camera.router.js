import express from "express";
import cameraController from "../controllers/camera.controller.js";
const router = express.Router();


router.post("/", cameraController.addCamera);
router.put("/:id", cameraController.updateCamera);
router.get("/", cameraController.getAllCameras);
router.get("/:id", cameraController.getOnecamera);
router.delete("/:id", cameraController.deleteCamera);

export default router;