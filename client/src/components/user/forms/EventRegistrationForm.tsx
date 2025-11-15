'use client';

import React from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react';
import { Button } from '@/components/base/ui/Button';
import { Input } from '@/components/base/ui/Input';
import { Event, User } from '@/types';

const registrationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  emergencyContact: Yup.string().required('Emergency contact is required'),
  specialRequirements: Yup.string(),
});

interface RegistrationFormValues {
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  specialRequirements: string;
}

interface EventRegistrationFormProps {
  event: Event;
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: RegistrationFormValues) => Promise<void>;
  loading?: boolean;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({
  event,
  user,
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}) => {
  if (!isOpen) return null;

  const initialValues: RegistrationFormValues = {
    name: user.name || '',
    email: user.email || '',
    phone: '',
    emergencyContact: '',
    specialRequirements: '',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Register for Event</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6 p-4 bg-purple-50 rounded-xl">
            <h3 className="font-semibold text-purple-900">{event.title}</h3>
            <p className="text-sm text-purple-700">{event.date} at {event.time}</p>
            <p className="text-sm text-purple-700">{event.venue}</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={registrationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-4">
                <Field name="name">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      label="Full Name"
                      placeholder="Enter your full name"
                      error={touched.name && errors.name ? errors.name : ''}
                    />
                  )}
                </Field>

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

                <Field name="phone">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      type="tel"
                      label="Phone Number"
                      placeholder="Enter your phone number"
                      error={touched.phone && errors.phone ? errors.phone : ''}
                    />
                  )}
                </Field>

                <Field name="emergencyContact">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      label="Emergency Contact"
                      placeholder="Emergency contact number"
                      error={touched.emergencyContact && errors.emergencyContact ? errors.emergencyContact : ''}
                    />
                  )}
                </Field>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requirements (Optional)
                  </label>
                  <Field name="specialRequirements">
                    {({ field }: FieldProps) => (
                      <textarea
                        {...field}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                        placeholder="Any dietary restrictions, accessibility needs, etc."
                      />
                    )}
                  </Field>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading ? 'Registering...' : 'Register'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                    disabled={isSubmitting || loading}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationForm;