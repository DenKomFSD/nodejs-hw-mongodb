import createHttpError from 'http-errors';
import { signup, findUser } from '../services/auth.js';
import { requestResetToken } from '../services/auth.js';
import {
  createSession,
  deleteSession,
  findSession,
} from '../services/session.js';
// import { sendMail } from '../utils/sendMail.js';
// import { env } from '../utils/env.js';
import { compareHash } from '../utils/hash.js';
import { resetPassword } from '../services/auth.js';
import { loginOrSignupWithGoogle } from '../services/auth.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';

const setupResponseSession = (
  res,
  { refreshToken, refreshTokenValidUntil, _id },
) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
};

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
  // const verifyEmail = {
  //   subject: 'Verify email',
  //   to: email,
  //   html: `<a href="${env(
  //     'APP_DOMAIN',
  //   )}/auth/verify" target="_blank">Click to verify email</a>`,
  // };

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

  // if (!user.verify) {
  //   throw createHttpError(401, 'Email not verified !');
  // }

  const passwordCompare = await compareHash(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Invalid password !');
  }

  const session = await createSession(user._id);

  setupResponseSession(res, session);
  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;
  console.log('Cookies:', req.cookies.sessionId);
  //шукаємо сессію
  const currentSession = await findSession({ _id: sessionId, refreshToken });
  if (!currentSession) {
    throw createHttpError(401, 'Session not found');
  }

  const refreshTokenExpired =
    new Date() > new Date(currentSession.refreshTokenValidUntil);

  if (refreshTokenExpired) {
    throw createHttpError(401, 'Session Expired');
  }

  const newSession = await createSession(currentSession.userId);

  setupResponseSession(res, newSession);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: newSession.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (!sessionId) {
    throw createHttpError(401, 'Session not found');
  }

  await deleteSession({ _id: sessionId });
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password has been successfully reset.',
    status: 200,
    data: {},
  });
};

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.body.code);
  setupResponseSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
