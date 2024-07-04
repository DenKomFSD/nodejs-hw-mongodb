import Contact from '../db/models/Contact.js';
import calcPagination from '../utils/calcPagination.js';
import { contactFieldList } from '../constants/contacts-constants.js';
import { sortOrderList } from '../constants/sorting.js';

export const getContacts = async ({
  isFavourite,
  type,
  page,
  perPage,
  sortBy = contactFieldList[0],
  sortOrder = sortOrderList[0],
}) => {
  const skip = (page - 1) * perPage;
  const request = Contact.find();
  if (type) {
    request.where('type').equals(type);
  }
  if (isFavourite) {
    request.where('isFavourite').equals(isFavourite);
  }
  const items = await request
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const totalItems = await Contact.find().merge(request).countDocuments();
  const { totalPages, hasNextPage, hasPreviousPage } = calcPagination({
    total: totalItems,
    page,
    perPage,
  });
  return {
    items,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
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
