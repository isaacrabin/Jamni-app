import { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { generateOpenAPIDocument } from './api/registry';

export function setupSwagger(app: Express): void {
  const spec = generateOpenAPIDocument();

  app.get('/api-docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(spec);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (app as any).use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec, {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'Jamni API Docs',
  }));

  console.log(`📖 Swagger UI:   http://localhost:${process.env.PORT ?? 8000}/api-docs`);
  console.log(`📄 OpenAPI JSON: http://localhost:${process.env.PORT ?? 8000}/api-docs.json`);
}
