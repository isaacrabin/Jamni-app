import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { registerRoutes } from './api/routes';

export async function setupApp(app: Express) {
  // Global middleware
  app.use(helmet());
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  
  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      service: 'jamni-backend'
    });
  });
  
  // Register all routes
  await registerRoutes(app);
  
  // Error handling middleware (should be last)
  app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      error: err.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  });
}
