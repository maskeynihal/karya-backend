import { Router } from 'express';

import * as taskController from '@/controllers/taskController';
import { findTask, taskValidator, taskUpdateValidator } from '@/validators/taskValidator';

const router = Router();

/**
 * GET /api/tasks
 */
router.get('/', taskController.fetchAll);

/**
 * GET /api/tasks/:id
 */
router.get('/:id', taskController.fetchById);

/**
 * POST /api/tasks
 */
router.post('/', taskValidator, taskController.create);

/**
 * PUT /api/tasks/:id
 */
router.put('/:id', findTask, taskUpdateValidator, taskController.update);

/**
 * DELETE /api/tasks/:id
 */
router.delete('/:id', findTask, taskController.deleteTask);

export default router;
