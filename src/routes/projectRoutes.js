import { Router } from 'express';

import * as projectController from '@/controllers/projectController';
import { findProject, projectValidator } from '@/validators/projectValidator';
import authenticated from 'middlewares/authenticated';

const router = Router();

/**
 * GET /api/users
 */
router.get('/', authenticated, projectController.fetchAll);

/**
 * GET /api/users/:id
 */
router.get('/:id', projectController.fetchById);

/**
 * POST /api/users
 */
router.post('/', projectValidator, projectController.create);

/**
 * PUT /api/users/:id
 */
router.put('/:id', findProject, projectValidator, projectController.update);

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', findProject, projectController.deleteProject);

export default router;
