import { Router } from 'express';
import { getMeController, updateMeController } from './user.controller.js';
import { authenticate } from '../auth/auth.middleware.js';

const router = Router();

router.get('/me', authenticate, getMeController);
router.patch('/me', authenticate, updateMeController);

export default router;
