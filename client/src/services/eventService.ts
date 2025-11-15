import { AxiosResponse } from 'axios';
import api from '../lib/api';
import { Event } from '../types';

interface EventPayload {
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  price: number;
  totalSeats: number;
  image?: string;
  organizer: string;
}

interface EventsResponse {
  success: boolean;
  message: string;
  data: {
    events: Event[];
  };
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

interface EventResponse {
  success: boolean;
  message: string;
  data: {
    event: Event;
  };
}

interface BaseResponse {
  success: boolean;
  message: string;
}

interface EventsQuery {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  search?: string;
}

export const eventService = {
  getEvents: async (query?: EventsQuery): Promise<EventsResponse> => {
    const response: AxiosResponse = await api.get('/events', { params: query });
    return response.data;
  },

  getEvent: async (id: string): Promise<EventResponse> => {
    const response: AxiosResponse = await api.get(`/events/${id}`);
    return response.data;
  },

  createEvent: async (payload: EventPayload): Promise<EventResponse> => {
    const response: AxiosResponse = await api.post('/events', payload);
    return response.data;
  },

  updateEvent: async (id: string, payload: Partial<EventPayload>): Promise<EventResponse> => {
    const response: AxiosResponse = await api.put(`/events/${id}`, payload);
    return response.data;
  },

  deleteEvent: async (id: string): Promise<BaseResponse> => {
    const response: AxiosResponse = await api.delete(`/events/${id}`);
    return response.data;
  },

  registerForEvent: async (id: string, registrationData?: {
    name: string;
    email: string;
    phone: string;
    emergencyContact: string;
    specialRequirements?: string;
  }): Promise<BaseResponse> => {
    const response: AxiosResponse = await api.post(`/events/${id}/register`, registrationData);
    return response.data;
  },

  unregisterFromEvent: async (id: string): Promise<BaseResponse> => {
    const response: AxiosResponse = await api.delete(`/events/${id}/register`);
    return response.data;
  },

  getMyEvents: async (): Promise<EventsResponse> => {
    const response: AxiosResponse = await api.get('/events/user/my-events');
    return response.data;
  },

  getRegisteredEvents: async (): Promise<EventsResponse> => {
    const response: AxiosResponse = await api.get('/events/user/registered');
    return response.data;
  },

  getEventRegisteredUsers: async (id: string): Promise<{
    success: boolean;
    message: string;
    data: {
      event: {
        id: string;
        title: string;
        capacity: number;
        registeredCount: number;
        users: Array<{
          _id: string;
          name: string;
          email: string;
          avatar?: string;
          createdAt: string;
        }>;
      };
    };
  }> => {
    const response: AxiosResponse = await api.get(`/events/${id}/registered-users`);
    return response.data;
  }
};

export default eventService;