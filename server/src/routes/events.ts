import express from "express";
import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
  getMyEvents,
  getRegisteredEvents,
  getEventRegisteredUsers,
  getAllUsers,
} from "../controllers/events";
import { authenticate, authorize } from "../middlewares/auth";
import { eventValidation, updateEventValidation } from "../validations/eventValidation";

const router = express.Router();

// Public routes
router.get("/", getEvents);
router.get("/:id", getEvent);

// Protected routes
router.use(authenticate);

// User routes
router.post("/", eventValidation, createEvent);
router.put("/:id", updateEventValidation, updateEvent);
router.delete("/:id", deleteEvent);
router.post("/:id/register", registerForEvent);
router.delete("/:id/register", unregisterFromEvent);
router.get("/user/my-events", getMyEvents);
router.get("/user/registered", getRegisteredEvents);

// Admin routes
router.get("/:id/registered-users", getEventRegisteredUsers);
router.get("/admin/users", authorize("admin"), getAllUsers);

export default router;