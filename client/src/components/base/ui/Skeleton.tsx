import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );
};

// Specific skeleton components for different use cases
export const EventCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  </div>
);

export const TableRowSkeleton: React.FC = () => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <Skeleton className="h-6 w-16 rounded-full" />
    </td>
    <td className="px-6 py-4">
      <Skeleton className="h-4 w-20" />
    </td>
    <td className="px-6 py-4">
      <Skeleton className="h-4 w-12" />
    </td>
    <td className="px-6 py-4">
      <Skeleton className="h-4 w-16" />
    </td>
    <td className="px-6 py-4">
      <div className="flex gap-2 justify-end">
        <Skeleton className="h-8 w-12" />
        <Skeleton className="h-8 w-16" />
      </div>
    </td>
  </tr>
);

export const StatCardSkeleton: React.FC = () => (
  <div className="p-6 bg-white rounded-2xl shadow-lg">
    <div className="flex items-center justify-between mb-4">
      <Skeleton className="w-14 h-14 rounded-2xl" />
      <Skeleton className="h-6 w-12 rounded-full" />
    </div>
    <Skeleton className="h-4 w-20 mb-1" />
    <Skeleton className="h-8 w-16" />
  </div>
);

export const EventDetailSkeleton: React.FC = () => (
  <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Skeleton className="h-96 w-full rounded-3xl" />
          <div className="bg-white p-8 rounded-2xl">
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="bg-white p-8 rounded-2xl">
            <Skeleton className="h-6 w-32 mb-6" />
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Skeleton className="w-6 h-6 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Skeleton className="w-6 h-6 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Skeleton className="w-6 h-6 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl">
            <div className="mb-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-20" />
            </div>
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const FormSkeleton: React.FC = () => (
  <div className="space-y-4">
    <Skeleton className="h-4 w-20 mb-2" />
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-4 w-20 mb-2" />
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-4 w-20 mb-2" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-12 w-32" />
  </div>
);

export default Skeleton;