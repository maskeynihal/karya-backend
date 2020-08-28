import { Router } from 'express';

import * as commentController from '@/controllers/commentController';
import { findComment, commentValidator, commentUpdateValidator } from '@/validators/commentValidator';
import basicAuthorization from 'middlewares/basicAuthorization';
import { ADMIN_ROLE_ID, PROJECT_MANAGER_ROLE_ID } from '@/utils/constants';

const router = Router();

/**
 * GET /api/comments
 */
router.get('/', basicAuthorization([ADMIN_ROLE_ID]), commentController.fetchAll);

/**
 * GET /api/comments/:id
 */
router.get('/:id', commentController.fetchById);

/**
 * POST /api/comments
 */
router.post('/', commentValidator, commentController.create);

/**
 * PUT /api/comments/:id
 */
router.put('/:id', findComment, commentUpdateValidator, commentController.update);

/**
 * DELETE /api/comments/:id
 */
router.delete('/:id', findComment, commentController.deleteComment);

export default router;
