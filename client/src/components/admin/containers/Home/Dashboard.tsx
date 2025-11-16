"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/base/ui/Navbar";
import { Card } from "@/components/base/ui/Card";
import { StatCardSkeleton } from "@/components/base/ui/Skeleton";
import { DashboardStats } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { eventService, userService } from "@/services";

type Activity =
  | { id: number; type: "booking"; user: string; event: string; time: string }
  | { id: number; type: "user"; user: string; action: string; time: string }
  | { id: number; type: "event"; event: string; action: string; time: string };

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    totalUsers: 0,
    totalBookings: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [eventsResponse, usersResponse] = await Promise.all([
          eventService.getEvents(),
          userService.getAllUsers(),
        ]);

        if (eventsResponse.success && usersResponse.success) {
          const totalRegistrations = eventsResponse.data.events.reduce(
            (sum, event) => sum + (event.registeredUsers?.length || 0),
            0
          );
          const totalRevenue = eventsResponse.data.events.reduce(
            (sum, event) =>
              sum + event.price * (event.registeredUsers?.length || 0),
            0
          );

          setStats({
            totalEvents: eventsResponse.data.events.length,
            totalUsers: usersResponse.data.users.length,
            totalBookings: totalRegistrations,
            revenue: totalRevenue,
          });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  useEffect(() => {
    // In a real app, you would fetch recent activity from an API
    // For now, we'll show a placeholder message
    setRecentActivity([]);
  }, []);

  const statCards = [
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: "🎫",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: "👥",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Registrations",
      value: stats.totalBookings,
      icon: "📊",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar user={user} onLogout={logout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 text-lg">Welcome back, {user?.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <StatCardSkeleton key={index} />
              ))
            : statCards.map((stat, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-14 h-14 bg-linear-to-r ${stat.color} rounded-2xl flex items-center justify-center text-3xl`}
                    >
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </Card>
              ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>
                    <p className="text-gray-500">
                      No recent activity to display
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Activity will appear here as users register for events
                    </p>
                  </div>
                ) : (
                  recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                          activity.type === "booking"
                            ? "bg-purple-100"
                            : activity.type === "user"
                            ? "bg-blue-100"
                            : "bg-green-100"
                        }`}
                      >
                        {activity.type === "booking"
                          ? "🎫"
                          : activity.type === "user"
                          ? "👤"
                          : "📅"}
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {("user" in activity && activity.user) ||
                            ("event" in activity && activity.event)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {"event" in activity
                            ? `Booked ${activity.event}`
                            : "action" in activity
                            ? activity.action
                            : ""}
                        </p>
                      </div>

                      <span className="text-sm text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link href="/admin/events/add" className="block">
                  <div className="p-4 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">➕</span>
                      <span className="font-semibold">Create New Event</span>
                    </div>
                  </div>
                </Link>
                <Link href="/admin/events" className="block">
                  <div className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-all cursor-pointer">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">📋</span>
                      <span className="font-semibold text-gray-900">
                        Manage Events
                      </span>
                    </div>
                  </div>
                </Link>
                <Link href="/admin/users" className="block">
                  <div className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-all cursor-pointer">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">👥</span>
                      <span className="font-semibold text-gray-900">
                        View Users
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
