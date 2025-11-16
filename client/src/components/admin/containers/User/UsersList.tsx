"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/base/ui/Navbar";
import { Card } from "@/components/base/ui/Card";
import { Button } from "@/components/base/ui/Button";
import { Input } from "@/components/base/ui/Input";
import { TableRowSkeleton } from "@/components/base/ui/Skeleton";
import { User } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/services";
import { formatDate } from "@/lib/dateUtils";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const { user: currentUser, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      const response = await userService.getAllUsers({
        search: searchQuery || undefined,
      });
      if (response.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const timeoutId = setTimeout(fetchUsers, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, fetchUsers]);

  const handleDelete = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      // In a real app, you would call an API to delete the user
      // For now, we'll just show a message
      toast.error("User deletion not implemented yet", { id: userId });
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar user={currentUser} onLogout={logout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Manage Users
          </h1>
          <p className="text-gray-600 text-lg">
            View and manage all registered users
          </p>
        </div>

        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <TableRowSkeleton key={index} />
                    ))
                  : filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-linear-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                              {user.name.charAt(0)}
                            </div>
                            <span className="font-semibold text-gray-900">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {user.email}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {user.role === "admin" ? "Admin" : "User"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                alert(`View details for ${user.name}`)
                              }
                            >
                              View
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(user.id)}
                              disabled={user.id === currentUser?.id}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </Card>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No users found</p>
          </div>
        )}

        <div className="mt-8">
          <Card className="p-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold text-purple-600 mb-2">
                  {users.length}
                </p>
                <p className="text-gray-600 font-medium">Total Users</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600 mb-2">
                  {users.filter((u) => u.role === "admin").length}
                </p>
                <p className="text-gray-600 font-medium">Admins</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-green-600 mb-2">
                  {users.filter((u) => u.role === "user").length}
                </p>
                <p className="text-gray-600 font-medium">Regular Users</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
