import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  getUserProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getPublicPortfolio,
} from '../controllers/projectController.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/user/:username', getPublicPortfolio);

// Protected routes (require authentication)
router.get('/', authMiddleware, getUserProjects);
router.get('/:id', getProjectById);
router.post('/', authMiddleware, createProject);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

export default router;
