import bcrypt from 'bcrypt';

import User from '../db/models/User.js';

export const findUser = (filter) => User.findOne(filter);

export const signup = async (data) => {
  const { password } = data;
  //хешуємо пароль
  const hashPassword = await bcrypt.hash(password, 10);
  //розпилюєм і вертаєм не оригінальний пароль а захешований
  return User.create({ ...data, password: hashPassword });
};
