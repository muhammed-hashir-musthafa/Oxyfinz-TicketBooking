"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/base/ui/Navbar";
import { Card } from "@/components/base/ui/Card";
import { Button } from "@/components/base/ui/Button";
import { Input } from "@/components/base/ui/Input";
import { Event } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { eventService } from "@/services";
import { TableRowSkeleton } from "@/components/base/ui/Skeleton";
import { formatDate } from "@/lib/dateUtils";
import Image from "next/image";
import toast from "react-hot-toast";

export default function AdminEventsPage() {
  const { user, logout } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventService.getMyEvents();
      if (response.success) {
        setEvents(response.data.events);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await eventService.deleteEvent(id);
        if (response.success) {
          setEvents((prev) => prev.filter((e) => (e.id || e._id) !== id));
          toast.success('Event deleted successfully');
        }
      } catch (error) {
        console.error('Failed to delete event:', error);
        toast.error('Failed to delete event');
      }
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
      <Navbar user={user} onLogout={logout} />

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
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRowSkeleton key={index} />
                  ))
                ) : (
                  filteredEvents.map((event) => (
                    <tr
                      key={event.id || event._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <Image
                            width={64}
                            height={64}
                            src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=128&h=128&fit=crop&crop=center'}
                            alt={event.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              {event.title}
                            </p>
                            <p className="text-sm text-gray-600">{event.location || event.venue}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          {event.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{formatDate(event.date)}</td>
                      <td className="px-6 py-4 text-gray-900 font-semibold">
                        ${event.price}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-medium ${
                            (event.capacity - (event.registeredUsers?.length || 0)) < 50
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {event.capacity - (event.registeredUsers?.length || 0)}/{event.capacity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/events/${event.id || event._id}`}>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(event.id || event._id || '')}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
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
