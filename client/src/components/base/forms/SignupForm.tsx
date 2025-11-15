"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthContext";
import {Button} from "@/components/base/ui/Button";
import {Input} from "@/components/base/ui/Input";

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  role: Yup.string()
    .oneOf(["admin", "user"], "Invalid role")
    .required("Role is required"),
});

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const SignupForm: React.FC = () => {
  const { register, loading } = useAuth();

  const initialValues: SignupFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  };

  const handleSubmit = async (values: SignupFormValues) => {
    try {
      await register(values.name, values.email, values.password, values.role);
    } catch {
      // Error handled in context
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, values, setFieldValue }) => (
        <Form className="space-y-6 p-8">
          <div>
            <Field name="name">
              {({ field }: FieldProps) => (
                <Input
                  {...field}
                  type="text"
                  label="Full Name"
                  placeholder="Enter your full name"
                  error={touched.name && errors.name ? errors.name : ""}
                />
              )}
            </Field>
          </div>

          <div>
            <Field name="email">
              {({ field }: FieldProps) => (
                <Input
                  {...field}
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  error={touched.email && errors.email ? errors.email : ""}
                />
              )}
            </Field>
          </div>

          <div>
            <Field name="password">
              {({ field }: FieldProps) => (
                <Input
                  {...field}
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  error={
                    touched.password && errors.password ? errors.password : ""
                  }
                />
              )}
            </Field>
          </div>

          <div>
            <Field name="confirmPassword">
              {({ field }: FieldProps) => (
                <Input
                  {...field}
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  error={
                    touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : ""
                  }
                />
              )}
            </Field>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Register as
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={values.role === "user"}
                  onChange={() => setFieldValue("role", "user")}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">User</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={values.role === "admin"}
                  onChange={() => setFieldValue("role", "admin")}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Host</span>
              </label>
            </div>
            <ErrorMessage
              name="role"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || loading}
          >
            Create Account
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
