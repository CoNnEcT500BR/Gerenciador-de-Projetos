// Double-submit cookie CSRF check: the csrfToken cookie can only be read by same-origin JS,
// so a cross-site request cannot reproduce it in the X-CSRF-Token header.
import { Request, Response, NextFunction } from 'express';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
const EXEMPT_PATHS = new Set(['/auth/login', '/auth/register', '/auth/logout']);

export function verifyCsrf(req: Request, res: Response, next: NextFunction) {
  if (SAFE_METHODS.has(req.method) || EXEMPT_PATHS.has(req.path)) {
    return next();
  }

  const cookieToken = req.cookies?.csrfToken;
  const headerToken = req.headers['x-csrf-token'];

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({ error: 'Falha na validação CSRF' });
  }

  next();
}
