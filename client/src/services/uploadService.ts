import { AxiosResponse } from 'axios';
import api from '../lib/api';

interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    imageUrl: string;
  };
}

export const uploadService = {
  uploadImage: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response: AxiosResponse = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

export default uploadService;