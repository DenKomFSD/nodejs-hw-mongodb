import { Router } from 'express';
import { getContacts, getContactById } from './services/contacts.js';

const router = Router();

//request

router.get('/contacts', async (req, res) => {
  const result = await getContacts();
  res.json({
    status: 200,
    data: result,
    message: 'Successfully get contacts',
  });
});

//request by ID
router.get('/contacts/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;

    const data = await getContactById(contactId);

    if (!data) {
      return res.status(404).json({
        message: `Contact  not found`,
      });
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
      message: 'Something went wrong...',
      error: error.message,
    });
  }
});

export default router;
