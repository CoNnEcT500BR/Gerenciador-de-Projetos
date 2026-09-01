import { Request, Response } from 'express';
import { loginService, registerService } from './auth.service.js';
import { loginSchema, registerSchema } from './auth.schema.js';
import { setAuthCookies, clearAuthCookies } from './auth.cookies.js';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Erro desconhecido';
}

export async function loginController(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: 'Email ou senha inválidos' });
  }

  try {
    const { user, token } = await loginService(parsed.data);
    setAuthCookies(res, token);
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}

export async function registerController(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: 'Dados de cadastro inválidos' });
  }

  try {
    const { user, token } = await registerService(parsed.data);
    setAuthCookies(res, token);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}

export async function logoutController(_req: Request, res: Response) {
  clearAuthCookies(res);
  res.status(204).send();
}

