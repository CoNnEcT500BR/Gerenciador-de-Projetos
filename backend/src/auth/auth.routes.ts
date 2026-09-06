import { Router } from 'express';
import { loginController, logoutController, registerController } from './auth.controller.js';
import { rateLimit } from '../common/rateLimit.js';

const router = Router();

const isProduction = process.env.NODE_ENV === 'production';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 10 : 500,
  message: 'Muitas tentativas de autenticação. Tente novamente em alguns minutos.',
});

router.post('/login', authLimiter, loginController);
router.post('/register', authLimiter, registerController);
router.post('/logout', logoutController);

export default router;
