import { Router } from 'express';
import { getTasksController, createTaskController } from './task.controller.js';
import { authenticate } from '../auth/auth.middleware.js';

const router = Router();

router.get('/', authenticate, getTasksController);
router.post('/', authenticate, createTaskController);

export default router;
