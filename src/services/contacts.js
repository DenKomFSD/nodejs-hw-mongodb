import Contact from '../db/models/Contact.js';

export const getContacts = () => Contact.find();

export const getContactById = (contactId) => Contact.findById(contactId);

export const addContact = (data) => Contact.create(data);

export const upsertContact = async (filter, body, options = {}) => {
  Contact.findOneAndUpdate(filter, body, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!data || !data.value) return null;
  const isNew = Boolean(data?.lastErrorObject?.upserted);
  return {
    data: data.value,
    isNew,
  };
};
