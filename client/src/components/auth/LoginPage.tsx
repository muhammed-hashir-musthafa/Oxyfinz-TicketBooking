"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/base/ui/Card";
import LoginForm from "@/components/base/forms/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-s px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <Card>
          <LoginForm />
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
