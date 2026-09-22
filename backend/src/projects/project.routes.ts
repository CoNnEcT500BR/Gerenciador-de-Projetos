import { Router } from 'express';
import {
  getProjectsController,
  getProjectByIdController,
  createProjectController,
  updateProjectController,
  deleteProjectController,
  addProjectMemberController,
  removeProjectMemberController
} from './project.controller.js';
import { authenticate } from '../auth/auth.middleware.js';

const router = Router();

router.get('/', authenticate, getProjectsController);
router.post('/', authenticate, createProjectController);
router.get('/:id', authenticate, getProjectByIdController);
router.patch('/:id', authenticate, updateProjectController);
router.delete('/:id', authenticate, deleteProjectController);
router.post('/:id/members', authenticate, addProjectMemberController);
router.delete('/:id/members/:memberId', authenticate, removeProjectMemberController);

export default router;
