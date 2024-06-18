import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
  name: String,
  phoneNumber: Number,
  email: String,
  isFavourite: Boolean,
  contactType: String,
  createdAt: String,
  updatedAt: String,
});

const Contact = model('contact', contactSchema);

export default Contact;
