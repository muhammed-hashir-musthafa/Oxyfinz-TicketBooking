'use client';

import React, { useState } from 'react';
import {  X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import uploadService from '@/services/uploadService';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onUploadStatusChange?: (uploading: boolean) => void;
  error?: string;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onUploadStatusChange,
  error,
  label = 'Event Image',
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(value || '');

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploading(true);
    onUploadStatusChange?.(true);
    try {
      const response = await uploadService.uploadImage(file);
      if (response.success) {
        onChange(response.data.imageUrl);
        toast.success('Image uploaded successfully!');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Image upload failed. Please try again.');
      setPreview(''); // Reset preview on error
    } finally {
      setUploading(false);
      onUploadStatusChange?.(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        {preview ? (
          <div className="relative">
            <Image
              width={100}
              height={100}
              src={preview}
              alt="Preview"
              className="max-h-48 mx-auto rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-600 mb-2">
              {uploading ? 'Uploading...' : 'Click to upload an image'}
            </div>
            <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
          </div>
        )}
        
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;