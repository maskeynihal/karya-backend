import { Router } from 'express';

import * as loginController from '@/controllers/auth/loginController';

const router = Router();

/**
 * POST /api/auth/login
 */
router.post('/login', loginController.login);

export default router;
