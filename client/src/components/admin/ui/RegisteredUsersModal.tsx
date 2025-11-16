"use client";

import React, { useState, useEffect, useCallback } from "react";
import Modal from "@/components/base/ui/Modal";
import { eventService } from "@/services";
import toast from "react-hot-toast";

interface RegisteredUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eventTitle: string;
}

const RegisteredUsersModal: React.FC<RegisteredUsersModalProps> = ({
  isOpen,
  onClose,
  eventId,
  eventTitle,
}) => {
  const [eventData, setEventData] = useState<{
    users: Array<{
      _id: string;
      name: string;
      email: string;
      avatar?: string;
      createdAt: string;
    }>;
    capacity: number;
    registeredCount: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRegisteredUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await eventService.getEventRegisteredUsers(eventId);
      if (response.success) {
        setEventData({
          users: response.data.event.users,
          capacity: response.data.event.capacity,
          registeredCount: response.data.event.registeredCount,
        });
      }
    } catch (error) {
      console.error("Failed to fetch registered users:", error);
      toast.error("Failed to load registered users");
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    if (isOpen && eventId) {
      fetchRegisteredUsers();
    }
  }, [isOpen, eventId, fetchRegisteredUsers]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Registered Users - ${eventTitle}`}
      maxWidth="lg"
    >
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading registered users...</p>
          </div>
        ) : !eventData || eventData.users.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No users registered for this event yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">
                {eventData.registeredCount} user
                {eventData.registeredCount !== 1 ? "s" : ""} registered
              </p>
              <p className="text-sm text-gray-500">
                {eventData.capacity - eventData.registeredCount} seats remaining
              </p>
            </div>
            {eventData.users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500">
                    Registered: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Registered
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default RegisteredUsersModal;
