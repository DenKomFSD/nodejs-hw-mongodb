import Joi from 'joi';
import { emailRegExp } from '../constants/user-constants.js';

export const userSignupSchema = Joi.object({
  name: Joi.string().required().min(3).max(10),
  email: Joi.string().email().required().pattern(emailRegExp).messages({
    'string.pattern.base': 'Email must be a valid email address.',
  }),
  password: Joi.string().required().min(3),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().email().required().pattern(emailRegExp).messages({
    'string.pattern.base': 'Email must be a valid email address.',
  }),
  password: Joi.string().required().min(3),
});
