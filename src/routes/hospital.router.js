import express from "express";
import hospitalController from "../controllers/hostpital.controller.js";
const router = express.Router();

router.get("/", hospitalController.getHospitals);

export default router;