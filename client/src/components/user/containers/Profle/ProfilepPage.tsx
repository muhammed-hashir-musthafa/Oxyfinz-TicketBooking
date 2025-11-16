"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/base/ui/Navbar";
import { Card } from "@/components/base/ui/Card";
import { Button } from "@/components/base/ui/Button";
import { Input } from "@/components/base/ui/Input";
import { Event } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { eventService, authService } from "@/services";
import { formatDateTime } from "@/lib/dateUtils";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");

  const fetchRegisteredEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await eventService.getRegisteredEvents();
      if (response.success) {
        setRegisteredEvents(response.data.events);
      }
    } catch (error) {
      console.error("Error fetching registered events:", error);
      toast.error("Failed to load registered events");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setEditedName(user.name);
      fetchRegisteredEvents();
    }
  }, [user, fetchRegisteredEvents]);

  const handleSaveProfile = async () => {
    try {
      const response = await authService.updateProfile({ name: editedName });
      if (response.success) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };



  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to view your profile
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar user={user} onLogout={logout} />

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
                    {formatDateTime(user.createdAt)}
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
                My Registered Events
              </h2>

              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex gap-6 p-6 bg-gray-50 rounded-2xl">
                        <div className="w-40 h-40 bg-gray-300 rounded-xl"></div>
                        <div className="flex-1 space-y-3">
                          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : registeredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
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
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Events Registered
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You haven&apos;t registered for any events yet.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => (window.location.href = "/")}
                  >
                    Browse Events
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {registeredEvents.map((event) => (
                    <div
                      key={event.id || event._id}
                      className="flex gap-6 p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all"
                    >
                      <Image
                        width={160}
                        height={160}
                        src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop&crop=center'}
                        alt={event.title}
                        className="w-40 h-40 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            {event.title}
                          </h3>
                          <span className="px-4 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                            Registered
                          </span>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {event.description}
                        </p>

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
                            {formatDateTime(event.date, event.time)}
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
                            {event.location || event.venue}
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
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                              />
                            </svg>
                            {event.category}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600">
                              Available:{" "}
                              {event.capacity -
                                (event.registeredUsers?.length || 0)}
                              /{event.capacity}
                            </p>
                            <p className="text-xl font-bold text-purple-600">
                              ${event.price}
                            </p>
                          </div>
                          <div className="space-x-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                (window.location.href = `/events/${event.id || event._id}`)
                              }
                            >
                              View Details
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={async () => {
                                try {
                                  await eventService.unregisterFromEvent(
                                    event.id || event._id || ''
                                  );
                                  toast.success(
                                    "Successfully unregistered from event"
                                  );
                                  fetchRegisteredEvents();
                                } catch {
                                  toast.error(
                                    "Failed to unregister from event"
                                  );
                                }
                              }}
                            >
                              Unregister
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}


            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
