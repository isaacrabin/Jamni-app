import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';

const PORT = process.env.PORT ?? 8000;

function startServer() {
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on    http://localhost:${PORT}`);
    console.log(`📖 Swagger UI at        http://localhost:${PORT}/api-docs`);
    console.log(`📄 OpenAPI JSON at      http://localhost:${PORT}/api-docs.json`);
  });
}

startServer();
