import { randomBytes } from 'node:crypto';
import Session from '../db/models/Session.js';

export const createSession = (userId) => {
  const accessToken = randomBytes(30).toString();
};
