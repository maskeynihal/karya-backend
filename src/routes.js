import { Router } from 'express';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
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
router.use('/projects', projectRoutes);

export default router;
