import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  addContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

//request

router.get('/contacts', ctrlWrapper(getAllContactsController));

//request by ID
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

//POST request
router.post('/contacts', ctrlWrapper(addContactController));

export default router;
