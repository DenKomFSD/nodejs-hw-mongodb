import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { contactAddSchema } from '../validation/contacts-schemas.js';

const router = Router();

//request

router.get('/contacts', ctrlWrapper(getAllContactsController));

//request by ID
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

//POST request
router.post(
  '/contacts',
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
