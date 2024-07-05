import Contact from '../db/models/Contact.js';
import calcPagination from '../utils/calcPagination.js';
import { contactFieldList } from '../constants/contacts-constants.js';
import { sortOrderList } from '../constants/sorting.js';

export const getContacts = async ({
  filter,
  page,
  perPage,
  sortBy = contactFieldList[0],
  sortOrder = sortOrderList[0],
}) => {
  const limit = perPage;
  //added this to fix and try redeploy
  const skip = (page - 1) * perPage;

  const request = Contact.find();
  const totalItems = await Contact.find().merge(request).countDocuments();

  if (filter.type) {
    request.where('type').equals(filter.type);
    // countRequest.where('type').equals(filter.type);
  }
  if (filter.isFavourite) {
    request.where('isFavourite').equals(filter.isFavourite);
    // countRequest.where('isFavourite').equals(filter.isFavourite);
  }

  //   Contact.find().merge(request).countDocuments(),

  //   request
  //     .skip(skip)
  //     .limit(perPage)
  //     .sort({ [sortBy]: sortOrder })
  //     .exec(),
  // ]);

  // const paginationContacts = calcPagination(totalItems, page, perPage);
  const data = await request
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const { totalPages, hasNextPage, hasPreviousPage } = calcPagination({
    total: totalItems,
    perPage,
    page,
  });

  return {
    data,
    totalItems,
    page,
    perPage,
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
