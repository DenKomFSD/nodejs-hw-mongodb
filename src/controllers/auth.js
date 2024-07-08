import createHttpError from 'http-errors';
import { signup, findUser } from '../services/auth.js';
import { compareHash } from '../utils/hash.js';

export const signupController = async (req, res) => {
  //беремо емейл
  const { email } = req.body;
  //шукаємо чи він вже є
  const user = await findUser({ email });
  //якщо такий юзер знайден
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
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

export const signinController = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid email or password !');
  }

  const passwordCompare = await compareHash(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Invalid password !');
  }

  const accessToken = ;
  const refreshToken = ;
  res.json({
    status: 200,
    message: "Successfully logged in an user!",
    data: {
      accessToken,
    },

  })
};
