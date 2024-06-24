import {
  getContacts,
  getContactById,
  addContact,
  upsertContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res, next) => {
  try {
    const result = await getContacts();
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

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await upsertContact({ _id: contactId }, req.body, {
    upsert: true,
  });
  console.log(result.lastErrorObject.upserted);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.value,
  });
};
