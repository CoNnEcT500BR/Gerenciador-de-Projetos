import { Request, Response } from 'express';
import { contactSchema } from './contact.schema.js';

export function submitContactController(req: Request, res: Response) {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: 'Dados de contato inválidos',
      details: parsed.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  // The validated payload is ready for an email/CRM transport when one is configured.
  // Do not echo it in the response: contact messages can contain personal information.
  void parsed.data;
  return res.status(202).json({ message: 'Mensagem recebida com sucesso.' });
}
