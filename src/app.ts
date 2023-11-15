import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { loadConfiguration } from './configuration';
import { authRouter } from './routers/auth.router';

async function main(): Promise<void> {
  dotenv.config();
  const config = loadConfiguration(process.argv);

  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(authRouter);

  app.listen(config.backendPort, () => {
    console.log(`Server started at http://localhost:${config.backendPort}`);
  });
}

main().catch((err) => {
  console.error(`${new Date().toISOString()} Fatal error during startup`, err);
  process.exit(1);
});
