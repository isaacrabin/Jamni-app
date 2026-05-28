import { Router } from 'express';
import { Type } from '@sinclair/typebox';

import { registry } from '../registry';
import userRouter from './user';

// ─── Health Schema ───────────

const HealthResponseSchema = Type.Object({
  status: Type.String({
    example: 'ok',
  }),

  timestamp: Type.String({
    format: 'date-time',
    example: new Date().toISOString(),
  }),

  service: Type.String({
    example: 'jamni-api',
  }),
});

// ─── Register OpenAPI Path ────────

registry.registerPath({
  method: 'get',

  path: '/api/health',

  tags: ['Health'],

  summary: 'Health check',

  responses: {
    200: {
      description: 'Service is healthy',

      content: {
        'application/json': {
          schema: HealthResponseSchema,
        },
      },
    },
  },
});

// ─── Express Router ──────────

const router = Router();

router.get('/health', (_, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'jamni-api',
  });
});

router.use('/users', userRouter);

export default router;
