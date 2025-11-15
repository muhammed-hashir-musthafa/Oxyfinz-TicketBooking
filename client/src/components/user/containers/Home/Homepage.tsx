"use client";

import { useState } from "react";
import Link from "next/link";

import { Event, User } from "@/types";
import { Button } from "@/components/base/ui/Button";
import { EventCard } from "@/components/base/ui/EventCard";
import { Navbar } from "@/components/base/ui/Navbar";

const MOCK_FEATURED: Event[] = [
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
];

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);

  // Initialize with mock data so we don't call setState inside an effect synchronously.
  const [featuredEvents] = useState<Event[]>(MOCK_FEATURED);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar user={user} onLogout={() => setUser(null)} />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Discover Amazing
              </span>
              <br />
              <span className="text-gray-900">Events Near You</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Book tickets to concerts, conferences, sports events, and more.
              Your next experience is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/events">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Explore Events
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Music", "Sports", "Technology", "Food"].map((category) => (
            <div
              key={category}
              className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-linear-to-r from-purple-400 to-pink-400 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🎵</span>
              </div>
              <h3 className="font-semibold text-gray-900">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900">Featured Events</h2>
          <Link href="/events">
            <Button variant="ghost">View All →</Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 TicketHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
