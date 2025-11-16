"use client";

import { useState, useEffect, useMemo } from "react";
import { Event } from "@/types";
import { EventCard } from "@/components/base/ui/EventCard";
import { Navbar } from "@/components/base/ui/Navbar";
import { Input } from "@/components/base/ui/Input";
import { EventCardSkeleton } from "@/components/base/ui/Skeleton";
import { useAuth } from "@/context/AuthContext";
import { eventService } from "@/services";

export default function EventsPage() {
  const { user, logout } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getEvents({
          search: searchQuery || undefined,
          category: selectedCategory !== "All" ? selectedCategory : undefined
        });
        if (response.success) {
          setEvents(response.data.events);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchEvents, 300); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory]);

  const categories = [
    "All",
    "Music",
    "Sports",
    "Technology",
    "Food",
    "Art",
    "Business",
  ];

  // derive filteredEvents using useMemo instead of storing it in state
  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((ev) => ev.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (ev) =>
          ev.title.toLowerCase().includes(q) ||
          ev.description.toLowerCase().includes(q) ||
          (ev.location || ev.venue || '').toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [events, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar user={user} onLogout={logout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">Browse Events</h1>

        {/* Search and Filter */}
        <div className="mb-10 space-y-6">
          <Input
            type="text"
            placeholder="Search events by name, description, or venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-2xl"
          />

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 9 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-2xl text-gray-500">
                No events found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
