import React from "react";
import Link from "next/link";
import { Event } from "@/types";
import { Card } from "./Card";
import { formatDateTime } from "@/lib/dateUtils";
import Image from "next/image";

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Link href={`/events/${event.id || event._id}`}>
      <Card hover className="overflow-hidden cursor-pointer">
        <div className="relative h-56 overflow-hidden">
          <Image
            width={500}
            height={300}
            src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&crop=center'}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-purple-600">
            {event.category}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {event.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-700 text-sm">
              <svg
                className="w-5 h-5 mr-2 text-purple-500"
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

            <div className="flex items-center text-gray-700 text-sm">
              <svg
                className="w-5 h-5 mr-2 text-purple-500"
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
              {event.location || event.venue}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-500">Starting from</p>
              <p className="text-2xl font-bold text-purple-600">
                ${event.price}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Available</p>
              <p className="text-lg font-semibold text-gray-900">
                {event.capacity - (event.registeredUsers?.length || 0)} seats
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
