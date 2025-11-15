"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/base/ui/Card";
import EventForm from "@/components/admin/forms/EventForm";

const AddEvent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
      console.log("Creating event:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Event created successfully!");
      router.push("/admin/events");
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/events");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
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
