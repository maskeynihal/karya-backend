import { Router } from 'express';

import * as userController from '@/controllers/userController';
import { findUser, userValidator } from '@/validators/userValidator';
import authenticated from 'middlewares/authenticated';

const router = Router();

/**
 * GET /api/users
 */
router.get('/', authenticated, userController.fetchAll);

/**
 * GET /api/users/:id
 */
router.get('/:id', userController.fetchById);

/**
 * POST /api/users
 */
router.post('/', userValidator, userController.create);

/**
 * PUT /api/users/:id
 */
router.put('/:id', findUser, userValidator, userController.update);

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', findUser, userController.deleteUser);

export default router;
