import { Request, Response } from 'express';
import { uploadToCloudinary } from '../utils/upload';
import { successResponse, errorResponse } from '../utils/responseHandler';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return errorResponse(res, 400, 'No file uploaded');
    }

    const imageUrl = await uploadToCloudinary(req.file.buffer, 'events');

    return successResponse(res, 'Image uploaded successfully', {
      imageUrl,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return errorResponse(res, 500, 'Failed to upload image', error);
  }
};