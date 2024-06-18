import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getContacts, getContactById } from './services/contact-services.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
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

  app.use(logger);

  //request

  app.get('/api/contacts', async (req, res) => {
    const result = await getContacts();
    res.json({
      status: 200,
      data: result,
      message: 'Successfully get contacts',
    });
  });

  //request by ID
  app.get('/api/contacts/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const data = await getContactById(id);

      if (!data) {
        return res.status(404).json({
          message: `Contact with id=${id} not found`,
        });
      }
      res.json({
        status: 200,
        data,
        message: 'Successfully get contact by Id',
      });
    } catch (error) {
      if (error.message.includes('Cast to ObjectId failed ')) {
        error.status = 404;
      }
      const { status = 500 } = error;
      res.status(status).json({
        message: 'Something went wrong...',
        error: error.message,
      });
    }
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
