import { Router } from 'express';

import * as commentController from '@/controllers/commentController';
import { findComment, commentValidator, commentUpdateValidator } from '@/validators/commentValidator';

const router = Router();

/**
 * GET /api/comments
 */
router.get('/', commentController.fetchAll);

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
