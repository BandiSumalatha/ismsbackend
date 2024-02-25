import express from "express";
import userRoleController from "../controllers/user.role.controller.js";
import validate from "../middlewares/user.auth.js";
const router = express.Router();


router.post("/", validate, userRoleController.createUserRole);
router.put("/:id", validate, userRoleController.updateUserRole);
router.get("/", validate, userRoleController.getAllUserRoles);
router.get("/:id", validate, userRoleController.getOneUserRole);
router.delete("/:id", validate, userRoleController.deleteUserRole);

export default router;
