'use client';

import React from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/base/ui/Button';
import { Input } from '@/components/base/ui/Input';
import Modal from '@/components/base/ui/Modal';
import { formatDateTime } from '@/lib/dateUtils';
import { Event, User } from '@/types';
import { paymentService } from '@/services';
import toast from 'react-hot-toast';

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayInstance {
  open(): void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

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
  onSuccess: () => void;
  loading?: boolean;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({
  event,
  user,
  isOpen,
  onClose,
  onSuccess,
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

  const handlePayment = async (values: RegistrationFormValues) => {
    try {
      // Create payment order
      const orderResponse = await paymentService.createOrder(event.id || event._id || '', values);
      
      if (!orderResponse.success) {
        toast.error('Failed to create payment order');
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: 'Oxyfinz Events',
        description: `Registration for ${orderResponse.data.eventTitle}`,
        order_id: orderResponse.data.orderId,
        handler: async (response: RazorpayResponse) => {
          try {
            // Verify payment
            const verifyResponse = await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              eventId: event.id || event._id || '',
              registrationData: values,
            });

            if (verifyResponse.success) {
              toast.success('Payment successful! Registration completed.');
              onSuccess();
              onClose();
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: values.name,
          email: values.email,
          contact: values.phone,
        },
        theme: {
          color: '#9333ea',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to initiate payment');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Register for Event"
      maxWidth="md"
    >

      <div className="mb-6 p-4 bg-purple-50 rounded-xl">
        <h3 className="font-semibold text-purple-900">{event.title}</h3>
        <p className="text-sm text-purple-700">{formatDateTime(event.date, event.time)}</p>
        <p className="text-sm text-purple-700">{event.location || event.venue}</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={registrationSchema}
        onSubmit={handlePayment}
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
                {isSubmitting || loading ? 'Processing...' : `Pay ₹${event.price} & Register`}
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
    </Modal>
  );
};

export default EventRegistrationForm;