import { Express, Router } from 'express';
import { userRoutes } from './user';
// Import your migrated routes from FastAPI

export async function registerRoutes(app: Express) {
  const router = Router();
  
  // API versioning
  router.use('/users', userRoutes);
  // Add more routes here: /posts, /auth, etc.
  
  // Mount all routes under /api
  app.use('/api', router);
}
