import mongoose, { Schema } from "mongoose";
import { IEvent } from "../types";

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Event category is required"],
      enum: ["conference", "workshop", "seminar", "networking", "social", "sports", "cultural", "other"],
    },
    price: {
      type: Number,
      required: [true, "Event price is required"],
      min: [0, "Price cannot be negative"],
    },
    capacity: {
      type: Number,
      required: [true, "Event capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },
    registeredUsers: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    image: {
      type: String,
      default: "",
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.virtual("availableSpots").get(function () {
  return this.capacity - this.registeredUsers.length;
});

eventSchema.set("toJSON", { virtuals: true });

const Event = mongoose.model<IEvent>("Event", eventSchema);
export default Event;
export { IEvent };