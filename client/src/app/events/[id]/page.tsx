import EventDetailPage from "@/components/user/containers/Events/EventDetail";
import React from "react";

const EventDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <EventDetailPage eventId={id} />
    </div>
  );
};

export default EventDetail;
