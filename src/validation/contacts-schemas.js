import Joi from 'joi';
import {
  phoneRegExp,
  mailRegExp,
  typeList,
} from '../constants/contacts-constants.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  phoneNumber: Joi.string().required().pattern(phoneRegExp).min(3).max(20),
  email: Joi.string().pattern(mailRegExp),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...typeList)
    .default('personal'),
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
