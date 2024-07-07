import createHttpError from 'http-errors';
import { signup } from '../services/auth.js';

export const signupController = async (req, res) => {
  const newUser = await signup(req.body);
  //щоб в подальшому можна було все-ж таки найти пароль вертаємо розпилену дату але без паролю, тільки поля імені та пошти
  const data = {
    name: newUser.name,
    email: newUser.email,
  };
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};
