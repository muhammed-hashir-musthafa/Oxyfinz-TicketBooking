'use client';

import React, { useState } from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/base/ui/Button';
import { Input } from '@/components/base/ui/Input';
import ImageUpload from '@/components/admin/ui/ImageUpload';

const eventSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .required('Description is required'),
  date: Yup.date().required('Date is required'),
  time: Yup.string().required('Time is required'),
  location: Yup.string().required('Location is required'),
  category: Yup.string().required('Category is required'),
  price: Yup.number()
    .min(0, 'Price must be positive')
    .required('Price is required').typeError('Price must be a number'),
  capacity: Yup.number()
    .min(1, 'Capacity must be at least 1')
    .required('Capacity is required').typeError('Capacity must be a number'),
  image: Yup.string().optional(),

});

interface EventFormValues {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: number;
  capacity: number;
  image: string;
}

interface EventFormProps {
  initialValues?: Partial<EventFormValues>;
  onSubmit: (values: EventFormValues) => void;
  onDelete?: () => void;
  onCancel: () => void;
  isNew?: boolean;
  loading?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({
  initialValues,
  onSubmit,
  onDelete,
  onCancel,
  isNew = true,
  loading = false,
}) => {
  const [imageUploading, setImageUploading] = useState(false);
  const defaultValues: EventFormValues = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'conference',
    price: 0,
    capacity: 0,
    image: '',
    ...initialValues,
  };

  const categories = [
    'conference',
    'workshop', 
    'seminar',
    'networking',
    'social',
    'sports',
    'cultural',
    'other'
  ];

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={eventSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Field name="title">
              {({ field }: FieldProps) => (
                <Input
                  {...field}
                  label="Event Title"
                  placeholder="e.g. Summer Music Festival"
                  error={touched.title && errors.title ? errors.title : ''}
                />
              )}
            </Field>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <Field name="category">
                {({ field }: FieldProps) => (
                  <select
                    {...field}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
              {touched.category && errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Field name="description">
              {({ field }: FieldProps) => (
                <textarea
                  {...field}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                  placeholder="Describe your event..."
                />
              )}
            </Field>
            {touched.description && errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Field name="date">
              {({ field }: FieldProps) => (
                <Input
                  {...field}
                  type="date"
                  label="Date"
                  error={touched.date && errors.date ? errors.date : ''}
                />
              )}
            </Field>

            <Field name="time">
              {({ field }: FieldProps) => (
                <Input
                  {...field}
                  type="time"
                  label="Time"
                  error={touched.time && errors.time ? errors.time : ''}
                />
              )}
            </Field>
          </div>

          <Field name="location">
            {({ field }: FieldProps) => (
              <Input
                {...field}
                label="Location"
                placeholder="e.g. Central Park Arena"
                error={touched.location && errors.location ? errors.location : ''}
              />
            )}
          </Field>

          <div className="grid md:grid-cols-2 gap-6">
            <Field name="price">
              {({ field }: FieldProps) => (
                <Input
                  {...field}
                  type="text"
                  label="Price ($)"
                  placeholder="0.00"
                  error={touched.price && errors.price ? errors.price : ''}
                />
              )}
            </Field>

            <Field name="capacity">
              {({ field }: FieldProps) => (
                <Input
                  {...field}
                  type="text"
                  label="Capacity"
                  placeholder="100"
                  error={touched.capacity && errors.capacity ? errors.capacity : ''}
                />
              )}
            </Field>
          </div>

          <Field name="image">
            {({ field, form }: FieldProps) => (
              <ImageUpload
                value={field.value}
                onChange={(url) => form.setFieldValue('image', url)}
                onUploadStatusChange={setImageUploading}
                error={touched.image && errors.image ? errors.image : ''}
              />
            )}
          </Field>



          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1"
              disabled={isSubmitting || loading || imageUploading}
            >
              {imageUploading ? 'Uploading Image...' : isNew ? 'Create Event' : 'Update Event'}
            </Button>

            {!isNew && onDelete && (
              <Button
                type="button"
                variant="danger"
                size="lg"
                onClick={onDelete}
                disabled={loading}
              >
                Delete Event
              </Button>
            )}

            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EventForm;