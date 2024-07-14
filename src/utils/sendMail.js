import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';
import env from '../utils/env.js';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  secure: false,
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

export const sendMail = async (options) => {
  return await transporter(options);
};
