import AdminEventDetailPage from "@/components/admin/containers/Event/EventDetail";

const AdminEventDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <AdminEventDetailPage eventId={id} />
    </div>
  );
};

export default AdminEventDetail;
