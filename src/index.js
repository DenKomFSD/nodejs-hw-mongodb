import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

const PORT = 3000;
const app = express();
//pino logging request for formetting(put on the very begginning of middlewares)
app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

//adding cors
app.use(cors());

app.use(express.json());
//middlware with showing time of request
app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

//request
app.get('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

//middleware with err
app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

//middleware for request that is doesnt exist(adding in the end)
app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'not found',
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
