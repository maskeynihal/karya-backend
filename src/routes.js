import { Router } from 'express';

import authenticated from 'middlewares/authenticated';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import commentRoutes from './routes/commentRoutes';

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api
 */
router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

//authentication
router.use('/auth', authRoutes);

//users
router.use('/users', userRoutes);

//projects
router.use('/projects', authenticated, projectRoutes);

// task
router.use('/tasks', authenticated, taskRoutes);

//comments
router.use('/comments', authenticated, commentRoutes);

export default router;
