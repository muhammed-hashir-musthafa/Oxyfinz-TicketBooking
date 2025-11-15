"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/base/ui/Navbar";
import { Card } from "@/components/base/ui/Card";
import { Button } from "@/components/base/ui/Button";
import { Input } from "@/components/base/ui/Input";
import { Event, User } from "@/types";
import Image from "next/image";

const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival 2024",
    description: "Amazing music festival",
    date: "2024-07-15",
    time: "18:00",
    venue: "Central Park Arena",
    category: "Music",
    price: 89,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
    availableSeats: 450,
    totalSeats: 500,
    organizer: "EventPro Inc.",
  },
  {
    id: "2",
    title: "Tech Innovation Summit",
    description: "Latest in technology",
    date: "2024-08-20",
    time: "09:00",
    venue: "Convention Center",
    category: "Technology",
    price: 150,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    availableSeats: 200,
    totalSeats: 300,
    organizer: "TechWorld",
  },
  {
    id: "3",
    title: "Food & Wine Experience",
    description: "Culinary excellence",
    date: "2024-09-10",
    time: "17:00",
    venue: "Riverside Garden",
    category: "Food",
    price: 120,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    availableSeats: 150,
    totalSeats: 200,
    organizer: "Culinary Masters",
  },
];

export default function AdminEventsPage() {
  const [user] = useState<User>({
    id: "1",
    name: "Admin User",
    email: "admin@tickethub.com",
    role: "admin",
    createdAt: "2023-01-01",
  });

  // initialize events directly (avoid setState inside useEffect)
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const filteredEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.category.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [events, searchQuery]
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar user={user} onLogout={() => {}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900">Manage Events</h1>
          <Link href="/admin/events/add">
            <Button variant="primary" size="lg">
              + Create Event
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Event
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Seats
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <Image
                          width={64}
                          height={64}
                          src={event.image}
                          alt={event.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {event.title}
                          </p>
                          <p className="text-sm text-gray-600">{event.venue}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {event.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{event.date}</td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">
                      ${event.price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-medium ${
                          event.availableSeats < 50
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {event.availableSeats}/{event.totalSeats}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/events/${event.id}`}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(event.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No events found</p>
          </div>
        )}
      </div>
    </div>
  );
}
