import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
} from '../controllers/contacts.js';

const router = Router();

//request

router.get('/contacts', getAllContactsController);

//request by ID
router.get('/contacts/:contactId', getContactByIdController);

export default router;
