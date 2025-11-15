"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/base/ui/Navbar";
import { Card } from "@/components/base/ui/Card";
import { Button } from "@/components/base/ui/Button";
import { Input } from "@/components/base/ui/Input";
import { User, Booking, Event } from "@/types";
import Image from "next/image";

const MOCK_BOOKINGS: (Booking & { event: Event })[] = [
  {
    id: "1",
    userId: "1",
    eventId: "1",
    seats: 2,
    totalPrice: 195.8,
    bookingDate: "2024-06-01",
    status: "confirmed",
    event: {
      id: "1",
      title: "Summer Music Festival 2024",
      description: "Amazing music festival",
      date: "2024-07-15",
      time: "18:00",
      venue: "Central Park Arena",
      category: "Music",
      price: 89,
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
      availableSeats: 450,
      totalSeats: 500,
      organizer: "EventPro Inc.",
    },
  },
  {
    id: "2",
    userId: "1",
    eventId: "2",
    seats: 1,
    totalPrice: 165,
    bookingDate: "2024-06-05",
    status: "confirmed",
    event: {
      id: "2",
      title: "Tech Innovation Summit",
      description: "Latest in technology",
      date: "2024-08-20",
      time: "09:00",
      venue: "Convention Center",
      category: "Technology",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      availableSeats: 200,
      totalSeats: 300,
      organizer: "TechWorld",
    },
  },
];

export default function ProfilePage() {
  const [user, setUser] = useState<User>({
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "user",
    createdAt: "2024-01-15",
  });

  // initialize bookings directly — avoids calling setState inside an effect
  const [bookings] = useState<(Booking & { event: Event })[]>(MOCK_BOOKINGS);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);

  const handleSaveProfile = () => {
    setUser((prev) => ({ ...prev, name: editedName }));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar user={user} onLogout={() => {}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-10">My Profile</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="p-8">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-linear-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-6xl text-white font-bold">
                    {user.name.charAt(0)}
                  </span>
                </div>
                {isEditing ? (
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="mb-2"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {user.name}
                  </h2>
                )}
                <p className="text-gray-600">{user.email}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Role</span>
                  <span className="text-purple-600 font-semibold capitalize">
                    {user.role}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">
                    Member Since
                  </span>
                  <span className="text-purple-600 font-semibold">
                    {user.createdAt}
                  </span>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-2">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </Card>
          </div>

          {/* Bookings */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                My Bookings
              </h2>

              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex gap-6 p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all"
                  >
                    <Image
                      width={160}
                      height={160}
                      src={booking.event.image}
                      alt={booking.event.title}
                      className="w-40 h-40 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-900">
                          {booking.event.title}
                        </h3>
                        <span
                          className={`px-4 py-1 rounded-full text-sm font-semibold ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-700">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {booking.event.date} at {booking.event.time}
                        </div>
                        <div className="flex items-center text-gray-700">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                          </svg>
                          {booking.event.venue}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">
                            Seats: {booking.seats}
                          </p>
                          <p className="text-xl font-bold text-purple-600">
                            ${booking.totalPrice}
                          </p>
                        </div>
                        <Button variant="secondary" size="sm">
                          View Ticket
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {bookings.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-500">
                    No bookings yet. Start exploring events!
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
