import express from "express";
import { signup, login, getProfile, updateProfile } from "../controllers/auth";
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

export default router;
