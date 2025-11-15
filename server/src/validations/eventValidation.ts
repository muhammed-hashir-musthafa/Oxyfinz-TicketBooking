import { body } from "express-validator";

export const eventValidation = [
  body("title").trim().isLength({ min: 3, max: 100 }).withMessage("Title must be between 3 and 100 characters"),
  body("description").trim().isLength({ min: 10, max: 1000 }).withMessage("Description must be between 10 and 1000 characters"),
  body("date").isISO8601().withMessage("Please provide a valid date"),
  body("time").notEmpty().withMessage("Time is required"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("category").isIn(["conference", "workshop", "seminar", "networking", "social", "sports", "cultural", "other"]).withMessage("Invalid category"),
  body("price").isNumeric().isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("capacity").isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
];

export const updateEventValidation = [
  body("title").optional().trim().isLength({ min: 3, max: 100 }).withMessage("Title must be between 3 and 100 characters"),
  body("description").optional().trim().isLength({ min: 10, max: 1000 }).withMessage("Description must be between 10 and 1000 characters"),
  body("date").optional().isISO8601().withMessage("Please provide a valid date"),
  body("time").optional().notEmpty().withMessage("Time is required"),
  body("location").optional().trim().notEmpty().withMessage("Location is required"),
  body("category").optional().isIn(["conference", "workshop", "seminar", "networking", "social", "sports", "cultural", "other"]).withMessage("Invalid category"),
  body("price").optional().isNumeric().isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("capacity").optional().isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
];