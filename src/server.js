import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  //adding cors
  app.use(cors());
  app.use(express.json());
  //pino logging request for formatting(put on the very begginning of middlewares)
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  app.use(contactsRouter);
  app.use(logger);

  //middleware for request that is doesnt exist(adding in the end)
  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'not found',
    });
  });
  //middleware with err
  app.use((err, req, res) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  //listening server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
