import { Router } from 'express';
import { rateLimit } from '../common/rateLimit.js';
import { submitContactController } from './contact.controller.js';

const router = Router();
const isProduction = process.env.NODE_ENV === 'production';

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 5 : 500,
  message: 'Muitas mensagens de contato. Tente novamente em alguns minutos.',
});

router.post('/', contactLimiter, submitContactController);

export default router;
