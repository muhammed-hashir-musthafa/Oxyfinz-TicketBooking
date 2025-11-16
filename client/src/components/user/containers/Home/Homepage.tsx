"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Event } from "@/types";
import { Button } from "@/components/base/ui/Button";
import { EventCard } from "@/components/base/ui/EventCard";
import { Navbar } from "@/components/base/ui/Navbar";
import { EventCardSkeleton } from "@/components/base/ui/Skeleton";
import { useAuth } from "@/context/AuthContext";
import { eventService } from "@/services";
import toast from "react-hot-toast";

// Component to handle search params with Suspense
const SearchParamsHandler: React.FC = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      toast.error(error);
    }
  }, [searchParams]);

  return null;
};

export default function HomePage() {
  const { user, logout } = useAuth();
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        const response = await eventService.getEvents({ limit: 6 });
        if (response.success) {
          setFeaturedEvents(response.data.events);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedEvents();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      <Suspense fallback={null}>
        <SearchParamsHandler />
      </Suspense>
      <Navbar user={user} onLogout={logout} />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-7xl font-bold mb-6">
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
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))
          ) : featuredEvents.length > 0 ? (
            featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">No events available at the moment.</p>
            </div>
          )}
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
