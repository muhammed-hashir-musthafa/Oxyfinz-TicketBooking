import { AxiosResponse } from 'axios';
import api from '../lib/api';
import { User } from '../types';

interface UsersResponse {
  success: boolean;
  message: string;
  data: {
    users: User[];
  };
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

interface UsersQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export const userService = {
  getAllUsers: async (query?: UsersQuery): Promise<UsersResponse> => {
    const response: AxiosResponse = await api.get('/events/admin/users', { params: query });
    return response.data;
  }
};

export default userService;