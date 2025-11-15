// types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  price: number;
  image: string;
  availableSeats: number;
  totalSeats: number;
  organizer: string;
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