import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { json } from 'express';
import authRoutes from './auth/auth.routes.js';
import projectRoutes from './projects/project.routes.js';
import taskRoutes from './tasks/task.routes.js';
import userRoutes from './users/user.routes.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(json());

app.get('/', (req, res) => {
  res.json({ message: 'API backend do portfolio rodando' });
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

export default app;
