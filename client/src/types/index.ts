// types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  phone?: string;
  emergencyContact?: string;
  specialRequirements?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  _id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue?: string; // For backward compatibility
  category: string;
  price: number;
  image?: string;
  capacity: number;
  availableSeats?: number;
  totalSeats?: number;
  registeredUsers?: (string | { _id: string; id: string; name?: string })[];
  organizer: string | {
    _id: string;
    name: string;
    email: string;
  };
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  seats: number;
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
}

export interface DashboardStats {
  totalEvents: number;
  totalUsers: number;
  totalBookings: number;
  revenue: number;
}