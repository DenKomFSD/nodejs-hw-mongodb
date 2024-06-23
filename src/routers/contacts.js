import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

//request

router.get('/contacts', ctrlWrapper(getAllContactsController));

//request by ID
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

export default router;
