import createHttpError from 'http-errors';
import { findSession } from '../services/session.js';
import { findUser } from '../services/auth.js';

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
    return next(createHttpError(401, 'Missing token'));
  }

  const session = await findSession({ accessToken });
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }
  const accesTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (accesTokenExpired) {
    return next(createHttpError(401, 'Access token expired'));
  }

  //перевірка юзера
  const user = await findUser({ _id: session.userId });
  //якщо нема такого юзера прокидаємо помилку
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }
  req.user = user;
  next();
};

export default authenticate;
