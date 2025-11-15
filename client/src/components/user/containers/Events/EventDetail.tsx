"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Event, User } from "@/types";
import { Button } from "@/components/base/ui/Button";
import { Navbar } from "@/components/base/ui/Navbar";
import { Card } from "@/components/base/ui/Card";
import Image from "next/image";

interface EventDetailPageProps {
  eventId: string;
}

export default function EventDetailPage({ eventId }: EventDetailPageProps) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [seats, setSeats] = useState(1);

  // derive event from eventId using useMemo instead of setting state inside useEffect
  const event = useMemo<Event | null>(() => {
    if (!eventId) return null;

    // mock data - replace this lookup with your real data fetch
    const mock: Event = {
      id: eventId,
      title: "Summer Music Festival 2024",
      description:
        "Join us for an unforgettable night of live music featuring top artists from around the world. Experience breathtaking performances, amazing light shows, and create memories that will last a lifetime. This festival brings together music lovers from all walks of life for a celebration of sound and community.",
      date: "2024-07-15",
      time: "18:00",
      venue: "Central Park Arena",
      category: "Music",
      price: 89,
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200",
      availableSeats: 450,
      totalSeats: 500,
      organizer: "EventPro Inc.",
    };

    return mock;
  }, [eventId]);

  const handleBooking = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (event) {
      alert(`Booking ${seats} seat(s) for $${event.price * seats}`);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar user={user} onLogout={() => setUser(null)} />

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

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Number of Seats
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSeats(Math.max(1, seats - 1))}
                    className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                    {seats}
                  </span>
                  <button
                    onClick={() =>
                      setSeats(Math.min(event.availableSeats, seats + 1))
                    }
                    className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-6 p-4 bg-purple-50 rounded-xl">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${event.price * seats}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Service Fee</span>
                  <span className="font-semibold text-gray-900">
                    ${(event.price * seats * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-purple-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-purple-600 text-xl">
                      ${(event.price * seats * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full mb-4"
                size="lg"
                onClick={handleBooking}
              >
                Book Now
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-green-600">
                    {event.availableSeats}
                  </span>{" "}
                  seats available
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
