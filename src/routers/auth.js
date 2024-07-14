import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import {
  userSigninSchema,
  userSignupSchema,
} from '../validation/user-schema.js';
import {
  signupController,
  signinController,
  refreshController,
  logoutController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import {
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth-schema.js';
const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(userSignupSchema),
  ctrlWrapper(signupController),
);

authRouter.post(
  '/auth/login',
  validateBody(userSigninSchema),
  ctrlWrapper(signinController),
);

authRouter.post('/auth/refresh', ctrlWrapper(refreshController));

authRouter.post('/auth/logout', ctrlWrapper(logoutController));

authRouter.post(
  '/auth/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  '/auth/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default authRouter;
