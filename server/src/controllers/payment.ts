import { Request, Response } from "express";
import crypto from "crypto";
import { Types } from "mongoose";
import razorpay from "../config/razorpay";
import Event from "../models/Event";
import User from "../models/User";
import { successResponse, errorResponse } from "../utils/responseHandler";

export const createPaymentOrder = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.body;
    
    const event = await Event.findById(eventId);
    if (!event) {
      return errorResponse(res, 404, "Event not found");
    }

    if (event.registeredUsers.includes(req.user?.id as any)) {
      return errorResponse(res, 400, "Already registered for this event");
    }

    if (event.registeredUsers.length >= event.capacity) {
      return errorResponse(res, 400, "Event is full");
    }

    const options = {
      amount: event.price * 100, // Amount in paise
      currency: "INR" as const,
      receipt: `evt_${Date.now()}`,
      notes: {
        eventId: eventId as string,
        userId: req.user?.id as string,
        eventTitle: event.title,
      },
    };

    console.log('Creating Razorpay order with options:', options);
    console.log('Razorpay credentials check:', {
      key_id: process.env.RAZORPAY_KEY_ID ? 'Present' : 'Missing',
      key_secret: process.env.RAZORPAY_KEY_SECRET ? 'Present' : 'Missing'
    });

    const order = await razorpay.orders.create(options) as any;
    console.log('Razorpay order created:', order);

    return successResponse(res, "Payment order created successfully", {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      eventTitle: event.title,
      eventPrice: event.price,
    });
  } catch (error) {
    console.error("Create payment order error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      eventId,
      registrationData,
    } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return errorResponse(res, 400, "Invalid payment signature");
    }

    // Payment verified, register user for event
    const event = await Event.findById(eventId);
    if (!event) {
      return errorResponse(res, 404, "Event not found");
    }

    if (event.registeredUsers.includes(req.user?.id as any)) {
      return errorResponse(res, 400, "Already registered for this event");
    }

    if (event.registeredUsers.length >= event.capacity) {
      return errorResponse(res, 400, "Event is full");
    }

    // Update user with registration data
    const { name, email, phone, emergencyContact, specialRequirements } = registrationData;
    await User.findByIdAndUpdate(req.user?.id, {
      name,
      email,
      phone,
      emergencyContact,
      specialRequirements,
    });

    // Register user for event
    event.registeredUsers.push(req.user?.id as any);
    await event.save();

    return successResponse(res, "Payment verified and registration completed", {
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return errorResponse(res, 500, "Internal server error", error);
  }
};