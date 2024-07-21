import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  //adding cors

  app.use(express.json());
  //pino logging request for formatting(put on the very begginning of middlewares)
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  app.use(logger);
  app.use(cors());
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());
  app.use(authRouter);
  app.use(contactsRouter);

  //middleware for request that is doesnt exist(adding in the end)
  app.use('*', notFoundHandler);
  //middleware with err
  app.use(errorHandler);

  //listening server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
