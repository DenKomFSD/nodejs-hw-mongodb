import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();
  //adding cors
  app.use(cors());
  app.use(express.json());

  //pino logging request for formetting(put on the very begginning of middlewares)
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);

  //request
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  //middleware for request that is doesnt exist(adding in the end)
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'not found',
    });
    next();
  });
  //middleware with err
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
    next();
  });

  //listening server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
