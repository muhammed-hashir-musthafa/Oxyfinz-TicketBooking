import axios from 'axios';
import Cookies from 'js-cookie';
import { ApiResponse, Event, EventsResponse, User, UsersResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (name: string, email: string, password: string, role?: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/register', { name, email, password, role });
    return response.data;
  },

  getProfile: async (): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (data: { name: string; avatar?: string }): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },
};

// Events API
export const eventsAPI = {
  getEvents: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
  }): Promise<ApiResponse<EventsResponse>> => {
    const response = await api.get('/events', { params });
    return response.data;
  },

  getEvent: async (id: string): Promise<ApiResponse<{ event: Event }>> => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  createEvent: async (eventData: Partial<Event>): Promise<ApiResponse<{ event: Event }>> => {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  updateEvent: async (id: string, eventData: Partial<Event>): Promise<ApiResponse<{ event: Event }>> => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },

  deleteEvent: async (id: string): Promise<ApiResponse> => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  registerForEvent: async (id: string): Promise<ApiResponse> => {
    const response = await api.post(`/events/${id}/register`);
    return response.data;
  },

  unregisterFromEvent: async (id: string): Promise<ApiResponse> => {
    const response = await api.delete(`/events/${id}/register`);
    return response.data;
  },

  getMyEvents: async (): Promise<ApiResponse<{ events: Event[] }>> => {
    const response = await api.get('/events/user/my-events');
    return response.data;
  },

  getRegisteredEvents: async (): Promise<ApiResponse<{ events: Event[] }>> => {
    const response = await api.get('/events/user/registered');
    return response.data;
  },

  getAllUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ApiResponse<UsersResponse>> => {
    const response = await api.get('/events/admin/users', { params });
    return response.data;
  },
};

export default api;