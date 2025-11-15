import express from "express";
import { signup, login, getProfile, updateProfile, logout } from "../controllers/auth";
import { authenticate } from "../middlewares/auth";
import {
  registerValidation,
  loginValidation,
} from "../validations/authValidation";

const router = express.Router();

// Routes
router.post("/signup", registerValidation, signup);
router.post("/login", loginValidation, login);
router
  .route("/profile")
  .get(authenticate, getProfile)
  .put(authenticate, updateProfile);
router.post("/logout", logout);

export default router;
