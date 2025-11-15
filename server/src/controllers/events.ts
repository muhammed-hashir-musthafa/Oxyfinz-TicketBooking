import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Event from "../models/Event";
import User from "../models/User";
import { successResponse, errorResponse } from "../utils/responseHandler";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation failed", errors.array());
    }

    const eventData = {
      ...req.body,
      organizer: req.user?.id,
    };

    const event = await Event.create(eventData);
    await event.populate("organizer", "name email");

    return successResponse(res, "Event created successfully", { event });
  } catch (error) {
    console.error("Create event error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, category, status, search } = req.query;
    
    const query: any = {};
    
    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const events = await Event.find(query)
      .populate("organizer", "name email")
      .sort({ date: 1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));

    const total = await Event.countDocuments(query);

    return successResponse(res, "Events retrieved successfully", { events }, {
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      totalItems: total,
    });
  } catch (error) {
    console.error("Get events error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name email avatar")
      .populate("registeredUsers", "name email");

    if (!event) {
      return errorResponse(res, 404, "Event not found");
    }

    return successResponse(res, "Event retrieved successfully", { event });
  } catch (error) {
    console.error("Get event error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return errorResponse(res, 404, "Event not found");
    }

    if (event.organizer.toString() !== req.user?.id && req.user?.role !== "admin") {
      return errorResponse(res, 403, "Not authorized to update this event");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("organizer", "name email");

    return successResponse(res, "Event updated successfully", { event: updatedEvent });
  } catch (error) {
    console.error("Update event error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return errorResponse(res, 404, "Event not found");
    }

    if (event.organizer.toString() !== req.user?.id && req.user?.role !== "admin") {
      return errorResponse(res, 403, "Not authorized to delete this event");
    }

    await Event.findByIdAndDelete(req.params.id);

    return successResponse(res, "Event deleted successfully");
  } catch (error) {
    console.error("Delete event error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const registerForEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return errorResponse(res, 404, "Event not found");
    }

    if (event.registeredUsers.includes(req.user?.id as any)) {
      return errorResponse(res, 400, "Already registered for this event");
    }

    if (event.registeredUsers.length >= event.capacity) {
      return errorResponse(res, 400, "Event is full");
    }

    event.registeredUsers.push(req.user?.id as any);
    await event.save();

    return successResponse(res, "Successfully registered for event");
  } catch (error) {
    console.error("Register for event error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const unregisterFromEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return errorResponse(res, 404, "Event not found");
    }

    const userIndex = event.registeredUsers.indexOf(req.user?.id as any);
    if (userIndex === -1) {
      return errorResponse(res, 400, "Not registered for this event");
    }

    event.registeredUsers.splice(userIndex, 1);
    await event.save();

    return successResponse(res, "Successfully unregistered from event");
  } catch (error) {
    console.error("Unregister from event error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const getMyEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find({ organizer: req.user?.id })
      .populate("organizer", "name email")
      .sort({ createdAt: -1 });

    return successResponse(res, "My events retrieved successfully", { events });
  } catch (error) {
    console.error("Get my events error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const getRegisteredEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find({ registeredUsers: req.user?.id })
      .populate("organizer", "name email")
      .sort({ date: 1 });

    return successResponse(res, "Registered events retrieved successfully", { events });
  } catch (error) {
    console.error("Get registered events error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const getEventRegisteredUsers = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("registeredUsers", "name email avatar createdAt")
      .select("title registeredUsers capacity");

    if (!event) {
      return errorResponse(res, 404, "Event not found");
    }

    return successResponse(res, "Event registered users retrieved successfully", {
      event: {
        id: event._id,
        title: event.title,
        capacity: event.capacity,
        registeredCount: event.registeredUsers.length,
        users: event.registeredUsers
      }
    });
  } catch (error) {
    console.error("Get event registered users error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
      return errorResponse(res, 403, "Access denied. Admin only.");
    }

    const { page = 1, limit = 10, search } = req.query;
    
    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));

    const total = await User.countDocuments(query);

    return successResponse(res, "Users retrieved successfully", { users }, {
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      totalItems: total,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};