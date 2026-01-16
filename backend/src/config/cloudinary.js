import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Ensure dotenv is loaded
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Log configuration status (without exposing secrets)
console.log('Cloudinary configured:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key_exists: !!process.env.CLOUDINARY_API_KEY,
  api_secret_exists: !!process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;
