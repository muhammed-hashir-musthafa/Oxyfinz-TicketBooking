import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oxyfinz Events - Discover Amazing Events",
  description:
    "Discover and create amazing events. Connect with like-minded people and make memorable experiences.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}
