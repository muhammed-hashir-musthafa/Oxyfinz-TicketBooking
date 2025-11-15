"use client";

import React from "react";
import Link from "next/link";
import { User } from "@/types";
import { Button } from "./Button";

interface NavbarProps {
  user?: User | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const isAdmin = user?.role === "admin";
  const basePath = isAdmin ? "/admin" : "";

  const homeHref = basePath || "/";
  const eventsHref = `${basePath}/events`;
  const usersHref = `${basePath}/users`;

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href={homeHref} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              TicketHub
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href={homeHref}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Home
            </Link>

            <Link
              href={eventsHref}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Events
            </Link>

            {isAdmin && (
              <Link
                href={usersHref}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Users
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href={`${basePath}/profile`}>
                  <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-linear-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                      {userInitial}
                    </div>
                    <span className="hidden md:block font-medium text-gray-700">
                      {user.name}
                    </span>
                  </div>
                </Link>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
