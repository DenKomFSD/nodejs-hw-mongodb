import { Schema, model } from 'mongoose';
import {
  mailRegExp,
  phoneRegExp,
  typeList,
} from '../../constants/contacts-constants.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      match: phoneRegExp,
      required: true,
    },
    email: {
      type: String,
      match: mailRegExp,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: typeList,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Contact = model('contact', contactSchema);

export default Contact;
