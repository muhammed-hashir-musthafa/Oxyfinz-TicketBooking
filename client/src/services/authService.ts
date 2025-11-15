import { AxiosResponse } from 'axios';
import api from '../lib/api';
import { User } from '../types';

interface LoginPayload {
  email: string;
  password: string;
  role: 'user' | 'admin';
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

interface BaseResponse {
  success: boolean;
  message: string;
}

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response: AxiosResponse = await api.post('/auth/login', payload);
    return response.data;
  },

  signup: async (payload: SignupPayload): Promise<AuthResponse> => {
    const response: AxiosResponse = await api.post('/auth/signup', payload);
    return response.data;
  },

  logout: async (): Promise<BaseResponse> => {
    const response: AxiosResponse = await api.post('/auth/logout');
    return response.data;
  },

  getProfile: async (): Promise<ProfileResponse> => {
    const response: AxiosResponse = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (payload: { name: string; avatar?: string }): Promise<ProfileResponse> => {
    const response: AxiosResponse = await api.put('/auth/profile', payload);
    return response.data;
  }
};

export default authService;