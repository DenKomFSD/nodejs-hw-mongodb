import {
  getContacts,
  getContactById,
  addContact,
  upsertContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import parsePaginationParams from '../utils/parsePaginationParams.js';

export const getAllContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const result = await getContacts({ page, perPage });
    res.json({
      status: 200,
      data: result,
      message: 'Successfully get contacts',
    });
  } catch (err) {
    next(err);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await getContactById(contactId);
    //if NOT FOUND
    if (!data) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }
    res.json({
      status: 200,
      data,
      message: `Successfully found contact with id ${contactId}!`,
    });
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed ')) {
      error.status = 404;
    }
    const { status = 500 } = error;
    res.status(status).json({
      message: 'Something went wrong',
      data: { message: 'Contact not found' },
    });
  }
};

export const addContactController = async (req, res) => {
  const data = await addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully added contact',
    body: data,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await upsertContact({ _id: contactId }, req.body);

  if (!result) {
    throw createHttpError(404, {
      status: 404,
      message: 'Contact not found',
      data: { message: 'Contact not found' },
    });
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const result = await deleteContact({ _id: contactId });

  if (!result) {
    throw createHttpError(404, {
      status: 404,
      message: 'Contact not found',
      data: { message: 'Contact not found' },
    });
  }

  res.status(204).send();
};
