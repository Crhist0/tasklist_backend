import express from 'express';
import cors from 'cors';
import { makeRoutes } from './routes';
import { Express } from 'express-serve-static-core';
import swaggerUI from 'swagger-ui-express'
import swaggerConfigs from '../../../swagger.json'

export const createServer: () => Express = () => {
  const app: Express = express();
  app.use(express.json());
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerConfigs))
  app.use(cors());
  makeRoutes(app);
  return app;
};

export const initServer = async (app?: Express | undefined) => {
  app = app ?? createServer();
  await app.listen(process.env.PORT || 8081, () => console.log('Servidor rodando...'));
};
