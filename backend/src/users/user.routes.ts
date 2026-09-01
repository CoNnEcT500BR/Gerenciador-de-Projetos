import { Router } from 'express';
import { getMeController } from './user.controller.js';
import { authenticate } from '../auth/auth.middleware.js';

const router = Router();

router.get('/me', authenticate, getMeController);

export default router;
