import express, { Express } from 'express';
import dotenv from 'dotenv';
import { setupApp } from './app';

dotenv.config();

const PORT = process.env.PORT || 8000;

async function startServer() {
  const app: Express = express();
  
  // Setup middleware and routes
  await setupApp(app);
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 API docs available at http://localhost:${PORT}/api/health`);
  });
}

startServer().catch(console.error);
