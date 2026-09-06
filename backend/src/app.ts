import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { json } from 'express';
import authRoutes from './auth/auth.routes.js';
import projectRoutes from './projects/project.routes.js';
import taskRoutes from './tasks/task.routes.js';
import userRoutes from './users/user.routes.js';
import { verifyCsrf } from './common/csrf.js';

dotenv.config();

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const configuredOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:3000,http://localhost:3001')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const isAllowedLocalDevOrigin = (origin: string) =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      // Allow tools without an Origin header (curl, server-to-server) and configured origins only.
      if (!origin) {
        return callback(null, true);
      }

      if (configuredOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!isProduction && isAllowedLocalDevOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Origem não permitida pelo CORS'));
    },
    credentials: true,
  })
);
app.use(json({ limit: '10kb' }));
app.use(cookieParser());
app.use(verifyCsrf);

app.get('/', (req, res) => {
  res.json({ message: 'API backend do portfolio rodando' });
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

// Must be declared after routes: returns a clean 403 instead of Express's default 500 for blocked CORS origins.
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.message === 'Origem não permitida pelo CORS') {
    return res.status(403).json({ error: 'Origem não permitida' });
  }

  next(err);
});

export default app;
