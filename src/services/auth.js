import createHttpError from 'http-errors';
import User from '../db/models/User.js';
import { hashValue } from '../utils/hash.js';

export const findUser = (filter) => User.findOne(filter);

export const signup = async (data) => {
  const { password } = data;
  //хешуємо пароль
  const hashPassword = await hashValue(password);
  //розпилюєм і вертаєм не оригінальний пароль а захешований
  return User.create({ ...data, password: hashPassword });
};

export const requestResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
};
