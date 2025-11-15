"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/base/ui/Navbar";
import { Card } from "@/components/base/ui/Card";
import { FormSkeleton } from "@/components/base/ui/Skeleton";
import { useAuth } from "@/context/AuthContext";
import { eventService } from "@/services";
import EventForm from "@/components/admin/forms/EventForm";
import toast from "react-hot-toast";

interface AdminEventDetailPageProps {
  eventId: string;
}

export default function AdminEventDetailPage({ eventId }: AdminEventDetailPageProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const isNew = eventId === "new";

  const [loading, setLoading] = useState(!isNew);
  const [submitting, setSubmitting] = useState(false);
  const [initialData, setInitialData] = useState<any>(undefined);

  useEffect(() => {
    if (!isNew) {
      fetchEvent();
    }
  }, [eventId, isNew]);

  const fetchEvent = async () => {
    try {
      const response = await eventService.getEvent(eventId);
      if (response.success) {
        setInitialData(response.data.event);
      }
    } catch (error) {
      console.error('Failed to fetch event:', error);
      toast.error('Failed to load event');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      if (isNew) {
        const response = await eventService.createEvent(values);
        if (response.success) {
          toast.success('Event created successfully!');
          router.push('/admin/events');
        }
      } else {
        const response = await eventService.updateEvent(eventId, values);
        if (response.success) {
          toast.success('Event updated successfully!');
          router.push('/admin/events');
        }
      }
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to save event');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this event?')) {
      setSubmitting(true);
      try {
        const response = await eventService.deleteEvent(eventId);
        if (response.success) {
          toast.success('Event deleted successfully!');
          router.push('/admin/events');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        toast.error('Failed to delete event');
      } finally {
        setSubmitting(false);
      }
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
            {isNew ? "Create New Event" : "Edit Event"}
          </h1>
          <p className="text-gray-600">
            {isNew
              ? "Fill in the details to create a new event"
              : "Update event information"}
          </p>
        </div>

        <Card className="p-8">
          {loading ? (
            <FormSkeleton />
          ) : (
            <EventForm
              initialValues={initialData}
              onSubmit={handleSubmit}
              onDelete={!isNew ? handleDelete : undefined}
              onCancel={handleCancel}
              isNew={isNew}
              loading={submitting}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
