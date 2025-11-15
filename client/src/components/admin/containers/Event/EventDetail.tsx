"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/base/ui/Navbar";
import { Card } from "@/components/base/ui/Card";
import { User } from "@/types";
import EventForm from "@/components/admin/forms/EventForm";

interface AdminEventDetailPageProps {
  eventId: string;
}

export default function AdminEventDetailPage({ eventId }: AdminEventDetailPageProps) {
  const router = useRouter();
  const isNew = eventId === "new";

  const [user] = useState<User>({
    id: "1",
    name: "Admin User",
    email: "admin@tickethub.com",
    role: "admin",
    createdAt: "2023-01-01",
  });

  const [loading, setLoading] = useState(false);

  // Mock initial data for existing events - use eventId for data fetching
  const initialData = !isNew ? {
    title: "Summer Music Festival 2024",
    description: "Join us for an unforgettable night of live music featuring top artists from around the world.",
    date: "2024-07-15",
    time: "18:00",
    venue: "Central Park Arena",
    category: "Music",
    price: 89,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
    totalSeats: 500,
    organizer: "EventPro Inc.",
  } : undefined;

  const handleSubmit = async (values: {
    title: string;
    description: string;
    date: string;
    time: string;
    venue: string;
    category: string;
    price: number;
    totalSeats: number;
    image: string;
    organizer: string;
  }) => {
    setLoading(true);
    try {
      // Mock save - replace with API call
      console.log('Saving event:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(isNew ? "Event created successfully!" : "Event updated successfully!");
      router.push("/admin/events");
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this event?")) {
      setLoading(true);
      try {
        // Mock delete - replace with API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push("/admin/events");
      } catch (error) {
        console.error('Error deleting event:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    router.push("/admin/events");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar user={user} onLogout={() => {}} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            {isNew ? "Create New Event" : "Edit Event"}
          </h1>
          <p className="text-gray-600">
            {isNew
              ? "Fill in the details to create a new event"
              : "Update event information"}
          </p>
        </div>

        <Card className="p-8">
          <EventForm
            initialValues={initialData}
            onSubmit={handleSubmit}
            onDelete={!isNew ? handleDelete : undefined}
            onCancel={handleCancel}
            isNew={isNew}
            loading={loading}
          />
        </Card>
      </div>
    </div>
  );
}
