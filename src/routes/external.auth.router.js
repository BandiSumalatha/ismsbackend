import express from "express";
import HasRole from "../controllers/external.auth.controler.js";
import validate from "../middlewares/user.auth.js";
const router = express.Router();

router.post("/hasrole", validate, HasRole);

export default router;