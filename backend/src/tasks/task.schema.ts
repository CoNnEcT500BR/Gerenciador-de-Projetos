import { z } from 'zod';
import { sanitizeText } from '../common/sanitize.js';

export const createTaskSchema = z.object({
  title: z
    .string()
    .max(160)
    .transform(sanitizeText)
    .refine((value) => value.length >= 1, 'Título é obrigatório'),
  description: z.string().max(2000).transform(sanitizeText).optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE']).optional(),
  projectId: z.number().int().positive()
});

export const updateTaskStatusSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE'])
});
