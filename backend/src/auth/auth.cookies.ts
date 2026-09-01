import { Response } from 'express';
import crypto from 'crypto';

const isProduction = process.env.NODE_ENV === 'production';
const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export function setAuthCookies(res: Response, token: string) {
  const csrfToken = crypto.randomBytes(32).toString('hex');

  res.cookie('token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: TOKEN_MAX_AGE_MS,
    path: '/'
  });

  // Not httpOnly on purpose: the frontend reads this to echo it back in the X-CSRF-Token header.
  res.cookie('csrfToken', csrfToken, {
    httpOnly: false,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: TOKEN_MAX_AGE_MS,
    path: '/'
  });
}

export function clearAuthCookies(res: Response) {
  res.clearCookie('token', { path: '/' });
  res.clearCookie('csrfToken', { path: '/' });
}
