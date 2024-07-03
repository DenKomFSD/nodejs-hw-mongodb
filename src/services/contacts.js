import Contact from '../db/models/Contact.js';

export const getContacts = async ({ page, perPage }) => {
  const skip = (page - 1) * perPage;
  const items = await Contact.find().skip(skip).limit(perPage);
  const totalItems = await Contact.countDocuments();
  return { page, perPage, items, totalItems };
};

export const getContactById = (contactId) => Contact.findById(contactId);

export const addContact = (data) => Contact.create(data);

export const upsertContact = async (filter, data, options = {}) => {
  const result = await Contact.findOneAndUpdate(filter, data, {
    // new: true,
    // runValidators: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result?.lastErrorObject?.upserted);
  return {
    data: result.value,
    isNew,
  };
};

export const deleteContact = (filter) => Contact.findOneAndDelete(filter);
