import { Router } from 'express';
import {
  getProjectsController,
  getProjectByIdController,
  createProjectController
} from './project.controller.js';
import { authenticate } from '../auth/auth.middleware.js';

const router = Router();

router.get('/', authenticate, getProjectsController);
router.post('/', authenticate, createProjectController);
router.get('/:id', authenticate, getProjectByIdController);

export default router;
