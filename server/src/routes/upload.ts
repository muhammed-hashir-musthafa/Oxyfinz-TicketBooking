import express from 'express';
import { uploadImage } from '../controllers/upload';
import { authenticate } from '../middlewares/auth';
import { upload } from '../utils/upload';

const router = express.Router();

router.post('/image', authenticate, upload.single('image'), uploadImage);

export default router;