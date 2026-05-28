import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import apiRouter from './api/routes/index';
import { setupSwagger } from './swagger';

export function createApp(): Express {
  const app = express();

  // ─── Middleware ─────────────────
  app.use(helmet());
  app.use(cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  // ─── Routes ───────────────────────────
  app.use('/api', apiRouter);

  // ─── Swagger ──────────────────────────
  setupSwagger(app);

  // ─── Error handler ─────────────────────
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(err.status ?? 500).json({
      error: err.message ?? 'Internal server error',
      statusCode: err.status ?? 500,
    });
  });

  return app;
}
