import express from "express";
import userController from "../controllers/user.controller.js";
import validate from "../middlewares/user.auth.js";
const router = express.Router();

router.post("/", validate, userController.createUser);
router.get("/", validate, userController.getUser);
router.get("/:id", validate, userController.getUserById);
router.put("/:id", validate, userController.updateUser);
router.delete("/:id", validate, userController.deleteUser);

export default router;