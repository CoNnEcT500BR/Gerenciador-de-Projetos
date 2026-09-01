import { Router } from 'express';
import {
  getTasksController,
  createTaskController,
  updateTaskStatusController
} from './task.controller.js';
import { authenticate } from '../auth/auth.middleware.js';

const router = Router();

router.get('/', authenticate, getTasksController);
router.post('/', authenticate, createTaskController);
router.patch('/:id/status', authenticate, updateTaskStatusController);

export default router;
