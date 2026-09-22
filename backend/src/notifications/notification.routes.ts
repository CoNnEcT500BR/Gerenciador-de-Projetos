import { Router } from 'express';
import {
  getNotificationsController,
  markAllNotificationsReadController,
  markNotificationReadController
} from './notification.controller.js';
import { authenticate } from '../auth/auth.middleware.js';

const router = Router();

router.get('/', authenticate, getNotificationsController);
router.patch('/read-all', authenticate, markAllNotificationsReadController);
router.patch('/:id/read', authenticate, markNotificationReadController);

export default router;
