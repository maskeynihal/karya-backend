import { Router } from 'express';

import * as taskController from '@/controllers/taskController';
import { findTask, taskValidator, taskUpdateValidator } from '@/validators/taskValidator';
import basicAuthorization from 'middlewares/basicAuthorization';
import { ADMIN_ROLE_ID, PROJECT_MANAGER_ROLE_ID, TEAM_LEAD_ROLE_ID } from '@/utils/constants';
const router = Router();

/**
 * GET /api/tasks
 */
router.get('/', basicAuthorization([ADMIN_ROLE_ID]), taskController.fetchAll);

/**
 * GET /api/tasks/:id
 */
router.get('/:id', taskController.fetchById);

/**
 * POST /api/tasks
 */
router.post(
  '/',
  basicAuthorization([ADMIN_ROLE_ID, PROJECT_MANAGER_ROLE_ID, TEAM_LEAD_ROLE_ID]),
  taskValidator,
  taskController.create
);

/**
 * PUT /api/tasks/:id
 */
router.put('/:id', findTask, taskUpdateValidator, taskController.update);

/**
 * DELETE /api/tasks/:id
 */
router.delete(
  '/:id',
  basicAuthorization([ADMIN_ROLE_ID, PROJECT_MANAGER_ROLE_ID, TEAM_LEAD_ROLE_ID]),
  findTask,
  taskController.deleteTask
);

/**
 * POST /api/tasks/:id/add-user
 */
router.post(
  '/:id/add-users',
  basicAuthorization([ADMIN_ROLE_ID, PROJECT_MANAGER_ROLE_ID, TEAM_LEAD_ROLE_ID]),
  taskController.addTaggedUsers
);

/**
 * DELETE /api/tasks/:id/add-user
 */
router.delete(
  '/:id/remove-users',
  basicAuthorization([ADMIN_ROLE_ID, PROJECT_MANAGER_ROLE_ID, TEAM_LEAD_ROLE_ID]),
  taskController.removeTaggedUsers
);

export default router;
