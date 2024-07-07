import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
    return;
  }
  const { status = 500 } = err;
  res.status(status).json({
    status,
    message: 'Something went wrong',
    data: err.message,
  });
};
