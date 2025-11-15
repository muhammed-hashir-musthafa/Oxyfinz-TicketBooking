import multer from 'multer';
import { Request } from 'express';

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export const uploadToCloudinary = (buffer: Buffer, folder: string = 'events'): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cloudinary = require('../config/cloudinary').default;
    
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    ).end(buffer);
  });
};