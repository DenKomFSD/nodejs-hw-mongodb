import createHttpError from 'http-errors';
import { findSession } from '../services/session.js';

const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return next(createHttpError(401, 'Authorization header missing'));
  }

  const [bearer, accessToken] = authHeader.split(' ');
  if (bearer !== 'Bearer') {
    return next(createHttpError(401, 'Token must have Bearer type'));
  }
  if (!accessToken) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const session = await findSession({ accessToken });
};

export default authenticate;
