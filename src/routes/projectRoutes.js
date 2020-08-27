import { Router } from 'express';

import * as projectController from '@/controllers/projectController';
import { findProject, projectValidator, projectUpdateValidator } from '@/validators/projectValidator';
import authenticated from 'middlewares/authenticated';
import basicAuthorization from 'middlewares/basicAuthorization';

import { ADMIN_ROLE_ID, PROJECT_MANAGER_ROLE_ID } from '@/utils/constants';
import canOnProject from 'middlewares/canOnProject';

const router = Router();

/**
 * GET /api/projects
 */
router.get('/', basicAuthorization([ADMIN_ROLE_ID, PROJECT_MANAGER_ROLE_ID]), projectController.fetchAll);

/**
 * GET /api/projects/:id
 */
router.get('/:id', projectController.fetchById);

/**
 * POST /api/projects
 */
router.post('/', basicAuthorization([ADMIN_ROLE_ID]), projectValidator, projectController.create);

/**
 * PUT /api/projects/:id
 */
router.put(
  '/:id',
  findProject,
  basicAuthorization([ADMIN_ROLE_ID, PROJECT_MANAGER_ROLE_ID]),
  canOnProject,
  projectUpdateValidator,
  projectController.update
);

/**
 * DELETE /api/projects/:id
 */
router.delete('/:id', findProject, basicAuthorization([ADMIN_ROLE_ID]), projectController.deleteProject);

/**
 * POST /api/projects/:id/add-user
 */
router.post('/:id/add-users', canOnProject, projectController.addUsers);

/**
 * DELETE /api/projects/:id/add-user
 */
router.delete('/:id/remove-users', canOnProject, projectController.removeUsers);

export default router;
