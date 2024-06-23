import {
  getContacts,
  getContactById,
  addContact,
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

export const addContactController = async (req, res, next) => {
  const result = await addContact(req.body);
  console.log(result);

  res.status(201).json({
    status: 201,
    message: 'Successfully added contact',
    body: result,
  });
};
