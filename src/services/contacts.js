import Contact from '../db/models/Contact.js';

export const getContacts = () => Contact.find();

export const getContactById = (contactId) => Contact.findById(contactId);

export const addContact = (data) => Contact.create(data);
