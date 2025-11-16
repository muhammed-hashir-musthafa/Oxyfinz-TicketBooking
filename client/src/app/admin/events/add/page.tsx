"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/base/ui/Card";
import { Navbar } from "@/components/base/ui/Navbar";
import EventForm from "@/components/admin/forms/EventForm";
import { useAuth } from "@/context/AuthContext";
import { eventService } from "@/services";
import toast from "react-hot-toast";

const AddEvent = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  interface EventFormData {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: string;
    price: number;
    capacity: number;
    image: string;
  }

  const handleSubmit = async (values: EventFormData) => {
    setLoading(true);
    try {
      const eventData = {
        ...values,
        organizer: user?.name || 'Unknown'
      };
      const response = await eventService.createEvent(eventData);
      if (response.success) {
        toast.success('Event created successfully!');
        router.push("/admin/events");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/events");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar user={user} onLogout={logout} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Create New Event
          </h1>
          <p className="text-gray-600">
            Fill in the details to create a new event
          </p>
        </div>

        <Card className="p-8">
          <EventForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isNew={true}
            loading={loading}
          />
        </Card>
      </div>
    </div>
  );
};

export default AddEvent;
