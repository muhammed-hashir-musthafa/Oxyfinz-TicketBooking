import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import { generateToken } from "../utils/jwt";
import { successResponse, errorResponse } from "../utils/responseHandler";

export const signup = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation failed", errors.array());
    }

    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "User already exists with this email");
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    const token = generateToken({
      id: (user._id as string).toString(),
      email: user.email,
      role: user.role,
    });
    
    return successResponse(res, "User registered successfully", {
      user: {
        id: user._id as string,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation failed", errors.array());
    }

    const { email, password, role } = req.body;

    if (!role || !["admin", "user"].includes(role)) {
      return errorResponse(res, 400, "Valid role required");
    }

    const user = await User.findOne({ email, role }).select("+password");
    if (!user) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    const token = generateToken({
      id: (user._id as string).toString(),
      email: user.email,
      role: user.role,
    });
    return successResponse(res, "Login successful", {
      user: {
        id: user._id as string,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    return successResponse(res, "Profile retrieved successfully", {
      user: {
        id: user._id as string,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?.id,
      { name, avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    return successResponse(res, "Profile updated successfully", {
      user: {
        id: user._id as string,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Clear cookies
    res.clearCookie('token');
    res.clearCookie('refreshToken');
    
    return successResponse(res, "Logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};
