import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getContacts, getContactById } from './services/contacts.js';

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
  app.use(logger);

  //request

  app.get('/contacts', async (req, res) => {
    const result = await getContacts();
    res.json({
      status: 200,
      data: result,
      message: 'Successfully get contacts',
    });
  });

  //request by ID
  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;

      const data = await getContactById(contactId);

      if (!data) {
        return res.status(404).json({
          message: `Contact  not found`,
        });
      }
      res.json({
        status: 200,
        data,
        message: `Successfully found contact with id ${contactId}!`,
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
