import { Router } from 'express';

import * as userController from '@/controllers/userController';
import { findUser, userValidator, userUpdateValidator } from '@/validators/userValidator';
import authenticated from 'middlewares/authenticated';
import basicAuthorization from 'middlewares/basicAuthorization';
import { ADMIN_ROLE_ID, PROJECT_MANAGER_ROLE_ID } from '@/utils/constants';
const router = Router();

/**
 * GET /api/users
 */
router.get('/', authenticated, basicAuthorization([ADMIN_ROLE_ID, PROJECT_MANAGER_ROLE_ID]), userController.fetchAll);

/**
 * GET /api/users/:id
 */
router.get('/:id', userController.fetchById);

/**
 * POST /api/users
 */
router.post('/', userValidator, basicAuthorization([ADMIN_ROLE_ID]), userController.create);

/**
 * PUT /api/users/:id
 */
router.put('/:id', findUser, userUpdateValidator, userController.update);

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', findUser, basicAuthorization([ADMIN_ROLE_ID]), userController.deleteUser);

/**
 * POST /api/users/roles
 */
router.post('/role', basicAuthorization([ADMIN_ROLE_ID]), userController.fetchByRole);

export default router;
