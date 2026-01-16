import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Student Portfolio Builder API is running' });
});

// Start server immediately
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB in the background (don't wait for it)
connectDB().catch(err => {
  console.error('MongoDB connection failed, but server is still running:', err.message);
});
