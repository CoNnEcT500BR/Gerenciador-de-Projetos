import { z } from 'zod';
import { sanitizeText } from '../common/sanitize.js';

export const contactSchema = z.object({
  name: z
    .string()
    .max(120)
    .transform(sanitizeText)
    .refine((value) => value.length >= 2, 'Nome é obrigatório'),
  email: z.string().trim().email('Email inválido').transform((value) => value.toLowerCase()),
  subject: z
    .string()
    .max(160)
    .transform(sanitizeText)
    .refine((value) => value.length > 0, 'Assunto inválido')
    .optional(),
  message: z
    .string()
    .max(5000)
    .transform(sanitizeText)
    .refine((value) => value.length >= 10, 'Mensagem deve ter ao menos 10 caracteres'),
});

export type ContactInput = z.infer<typeof contactSchema>;
