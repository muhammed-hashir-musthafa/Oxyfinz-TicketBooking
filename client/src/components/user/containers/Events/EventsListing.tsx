"use client";

import { useState, useMemo } from "react";

import { Event, User } from "@/types";
import { EventCard } from "@/components/base/ui/EventCard";
import { Navbar } from "@/components/base/ui/Navbar";
import { Input } from "@/components/base/ui/Input";

const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival 2024",
    description:
      "Join us for an unforgettable night of live music featuring top artists from around the world.",
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
    description:
      "Explore the latest in AI, blockchain, and emerging technologies with industry leaders.",
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
    description:
      "Savor exquisite dishes and premium wines from renowned chefs and wineries.",
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
  {
    id: "4",
    title: "Championship Finals",
    description:
      "Witness the ultimate showdown between the top teams in an electrifying match.",
    date: "2024-07-25",
    time: "19:30",
    venue: "National Stadium",
    category: "Sports",
    price: 75,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
    availableSeats: 5000,
    totalSeats: 8000,
    organizer: "Sports League",
  },
  {
    id: "5",
    title: "Modern Art Exhibition",
    description:
      "Experience contemporary masterpieces from emerging and established artists.",
    date: "2024-08-05",
    time: "10:00",
    venue: "City Art Gallery",
    category: "Art",
    price: 25,
    image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800",
    availableSeats: 100,
    totalSeats: 150,
    organizer: "Arts Foundation",
  },
  {
    id: "6",
    title: "Business Leadership Conference",
    description:
      "Learn from successful entrepreneurs and business leaders sharing their insights.",
    date: "2024-09-15",
    time: "08:00",
    venue: "Grand Hotel Ballroom",
    category: "Business",
    price: 200,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
    availableSeats: 250,
    totalSeats: 300,
    organizer: "Business Network",
  },
];

export default function EventsPage() {
  const [user, setUser] = useState<User | null>(null);

  // initialize events directly (no effect needed for mock data)
  const [events] = useState<Event[]>(MOCK_EVENTS);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
          ev.venue.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [events, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar user={user} onLogout={() => setUser(null)} />

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
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">
              No events found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
