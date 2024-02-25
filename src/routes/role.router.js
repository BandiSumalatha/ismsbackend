import express from "express";
import roleController from "../controllers/role.controller.js";
import validate from "../middlewares/user.auth.js";
const router = express.Router();

router.post("/", validate, roleController.createRole);
router.get("/", validate, roleController.getRoles);
router.get("/:id", validate, roleController.getRoleById);
router.put("/:id", validate, roleController.updateRole);
router.delete("/:id", validate, roleController.deleteRole);

export default router;