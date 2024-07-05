import Joi from 'joi';
import {
  phoneRegExp,
  mailRegExp,
  typeList,
} from '../constants/contacts-constants.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  phoneNumber: Joi.string()
    .required()
    .pattern(phoneRegExp)
    .min(3)
    .max(20)
    .messages({
      'string.empty': 'Phone number is required.',
      'string.pattern.base':
        'Phone number must be in the format +380 followed by 9 digits. Example "+38050123456789',
      'string.min': 'Phone number should have a minimum length of {#limits}.',
      'string.max': 'Phone number should have a maximum length of {#limit}.',
    }),
  email: Joi.string().pattern(mailRegExp).messages({
    'string.pattern.base': 'Email must be a valid email address.',
  }),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...typeList)
    .default('personal')
    .messages({
      'string.min': 'Contact type should have a minimum length of {#limit}.',
      'string.max': 'Contact type should have a maximum length of {#limit}.',
      'any.only': 'Contact type must be one of {#valids}.',
    }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().pattern(phoneRegExp).min(3).max(20),
  email: Joi.string().pattern(mailRegExp),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...typeList),
});
