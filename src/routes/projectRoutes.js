import { Router } from 'express';

import * as projectController from '@/controllers/projectController';
import { findProject, projectValidator, projectUpdateValidator } from '@/validators/projectValidator';
import authenticated from 'middlewares/authenticated';

const router = Router();

/**
 * GET /api/projects
 */
router.get('/', projectController.fetchAll);

/**
 * GET /api/projects/:id
 */
router.get('/:id', projectController.fetchById);

/**
 * POST /api/projects
 */
router.post('/', projectValidator, projectController.create);

/**
 * PUT /api/projects/:id
 */
router.put('/:id', findProject, projectUpdateValidator, projectController.update);

/**
 * DELETE /api/projects/:id
 */
router.delete('/:id', findProject, projectController.deleteProject);

export default router;
