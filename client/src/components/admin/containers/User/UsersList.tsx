"use client";
import React, { useState } from "react";
import { Navbar } from "@/components/base/ui/Navbar";
import { Card } from "@/components/base/ui/Card";
import { Button } from "@/components/base/ui/Button";
import { Input } from "@/components/base/ui/Input";
import { User } from "@/types";

export default function AdminUsersPage() {
  const [currentUser] = useState<User>({
    id: "1",
    name: "Admin User",
    email: "admin@tickethub.com",
    role: "admin",
    createdAt: "2023-01-01",
  });

  // Initialize mock users directly to avoid calling setState synchronously inside useEffect
  const [users, setUsers] = useState<User[]>([
    {
      id: "2",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "user",
      createdAt: "2024-01-15",
    },
    {
      id: "3",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "user",
      createdAt: "2024-02-20",
    },
    {
      id: "4",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "user",
      createdAt: "2024-03-10",
    },
    {
      id: "5",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      role: "admin",
      createdAt: "2024-01-05",
    },
    {
      id: "6",
      name: "David Brown",
      email: "david.brown@example.com",
      role: "user",
      createdAt: "2024-04-12",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleRoleChange = (userId: string, newRole: "user" | "admin") => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  const handleDelete = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar user={currentUser} onLogout={() => {}} />

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
                {filteredUsers.map((user) => (
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
                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(
                            user.id,
                            e.target.value as "user" | "admin"
                          )
                        }
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {user.createdAt}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => alert(`View details for ${user.name}`)}
                        >
                          View
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                          disabled={user.id === currentUser.id}
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
