import { z } from 'zod';
import { sanitizeText } from '../common/sanitize.js';

export const registerSchema = z.object({
  name: z
    .string()
    .max(120)
    .transform(sanitizeText)
    .refine((value) => value.length >= 3, 'Nome deve ter ao menos 3 caracteres'),
  email: z.string().email(),
  password: z.string().min(6)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
