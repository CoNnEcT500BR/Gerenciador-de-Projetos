import { Router } from 'express';
import { authenticate } from '../auth/auth.middleware.js';
import { getProjectMessagesController } from './chat.controller.js';
import { uploadAttachmentController, downloadAttachmentController } from './attachment.controller.js';
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const router = Router();
router.get('/projects/:projectId/messages', authenticate, getProjectMessagesController);
router.post('/projects/:projectId/attachments', authenticate, upload.single('file'), uploadAttachmentController);
router.get('/attachments/:id/download', authenticate, downloadAttachmentController);

export default router;
