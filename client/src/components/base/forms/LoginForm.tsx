'use client';

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/base/ui/Input';
import { Button } from '@/components/base/ui/Button';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  role: Yup.string().oneOf(['admin', 'user'], 'Invalid role').required('Role is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
  role: string;
}

const LoginForm: React.FC = () => {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
    role: 'user',
  };

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password, values.role as 'user' | 'admin');
    } catch {
      // Error handled in context
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, values, setFieldValue }) => (
        <Form className="space-y-6 p-8">
          <div>
            <Field name="email">
              {({ field }: FieldProps) => (
                <Input
                  {...field}
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  error={touched.email && errors.email ? errors.email : ''}
                />
              )}
            </Field>
          </div>

          <div>
            <Field name="password">
              {({ field }: FieldProps) => (
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder="Enter your password"
                    error={touched.password && errors.password ? errors.password : ''}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </Field>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Login as
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={values.role === 'user'}
                  onChange={() => setFieldValue('role', 'user')}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">User</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={values.role === 'admin'}
                  onChange={() => setFieldValue('role', 'admin')}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Host</span>
              </label>
            </div>
            <ErrorMessage name="role" component="div" className="mt-1 text-sm text-red-600" />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || loading}
          >
            Sign In
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;