'use client';

import React from 'react';
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
                <Input
                  {...field}
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  error={touched.password && errors.password ? errors.password : ''}
                />
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