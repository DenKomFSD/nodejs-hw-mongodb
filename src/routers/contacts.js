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
import authenticate from '../middlewares/authenticate.js';
import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts-schemas.js';

const router = Router();

router.use(authenticate);

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

router.patch(
  '/contacts/:contactId',
  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
