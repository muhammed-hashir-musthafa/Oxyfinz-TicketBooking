"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Event } from "@/types";
import { Button } from "@/components/base/ui/Button";
import { Navbar } from "@/components/base/ui/Navbar";
import { Card } from "@/components/base/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { eventService } from "@/services";
import EventRegistrationForm from "@/components/user/forms/EventRegistrationForm";
import { EventDetailSkeleton } from "@/components/base/ui/Skeleton";
import Image from "next/image";
import toast from "react-hot-toast";

interface EventDetailPageProps {
  eventId: string;
}

export default function EventDetailPage({ eventId }: EventDetailPageProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const fetchEvent = useCallback(async () => {
    try {
      const response = await eventService.getEvent(eventId);
      if (response.success) {
        setEvent(response.data.event);
        // Check if user is already registered
        if (user && response.data.event.registeredUsers?.includes(user.id)) {
          setIsRegistered(true);
        }
      }
    } catch (error) {
      console.error('Failed to fetch event:', error);
      toast.error('Failed to load event');
    } finally {
      setLoading(false);
    }
  }, [eventId, user]);

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId, fetchEvent]);

  const handleRegistrationClick = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (isRegistered) {
      handleUnregister();
    } else {
      setShowRegistrationForm(true);
    }
  };

  const handleUnregister = async () => {
    if (!event) return;

    setRegistering(true);
    try {
      const response = await eventService.unregisterFromEvent(event.id);
      if (response.success) {
        setIsRegistered(false);
        toast.success('Successfully unregistered from event');
        fetchEvent();
      }
    } catch (error) {
      console.error('Unregistration failed:', error);
      toast.error('Unregistration failed');
    } finally {
      setRegistering(false);
    }
  };

  const handleRegistrationSubmit = async (values: {
    name: string;
    email: string;
    phone: string;
    emergencyContact: string;
    specialRequirements?: string;
  }) => {
    if (!event) return;

    setRegistering(true);
    try {
      const response = await eventService.registerForEvent(event.id, values);
      if (response.success) {
        setIsRegistered(true);
        setShowRegistrationForm(false);
        toast.success('Successfully registered for event');
        fetchEvent();
      }
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return <EventDetailSkeleton />;
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <Button onClick={() => router.push('/events')}>Back to Events</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar user={user} onLogout={logout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                width={1200}
                height={800}
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                  {event.category}
                </span>
                <h1 className="text-5xl font-bold text-white mb-2">
                  {event.title}
                </h1>
              </div>
            </div>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Event
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Event Details
              </h2>
              <div className="space-y-4">
                {/* Date & time */}
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-purple-600 mr-4 mt-1"
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
                  <div>
                    <p className="font-semibold text-gray-900">Date & Time</p>
                    <p className="text-gray-600">
                      {event.date} at {event.time}
                    </p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-purple-600 mr-4 mt-1"
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Venue</p>
                    <p className="text-gray-600">{event.venue}</p>
                  </div>
                </div>

                {/* Organizer */}
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-purple-600 mr-4 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Organizer</p>
                    <p className="text-gray-600">{event.organizer}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-8 sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Price per ticket</p>
                <p className="text-4xl font-bold text-purple-600">
                  ${event.price}
                </p>
              </div>

              {isRegistered && (
                <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-green-800 font-medium text-center">
                    ✓ You are registered for this event
                  </p>
                </div>
              )}

              <Button
                variant={event.availableSeats === 0 ? "ghost" : isRegistered ? "secondary" : "primary"}
                className="w-full mb-4"
                size="lg"
                onClick={handleRegistrationClick}
                disabled={registering || event.availableSeats === 0}
              >
                {registering ? 'Processing...' : event.availableSeats === 0 ? 'Event Full - No Seats Available' : isRegistered ? 'Unregister' : 'Register for Event'}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  {event.availableSeats === 0 ? (
                    <span className="font-semibold text-red-600">
                      Event is fully booked
                    </span>
                  ) : (
                    <>
                      <span className={`font-semibold ${
                        event.availableSeats < 10 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {event.availableSeats}
                      </span>{" "}
                      seats available
                    </>
                  )}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {user && event && (
        <EventRegistrationForm
          event={event}
          user={user}
          isOpen={showRegistrationForm}
          onClose={() => setShowRegistrationForm(false)}
          onSubmit={handleRegistrationSubmit}
          loading={registering}
        />
      )}
    </div>
  );
}