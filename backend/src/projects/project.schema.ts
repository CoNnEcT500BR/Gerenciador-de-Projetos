import { z } from 'zod';
import { sanitizeText } from '../common/sanitize.js';

export const createProjectSchema = z.object({
  title: z
    .string()
    .max(120)
    .transform(sanitizeText)
    .refine((value) => value.length >= 1, 'Título é obrigatório'),
  description: z.string().max(2000).transform(sanitizeText).optional()
});
