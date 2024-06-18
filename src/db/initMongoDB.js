import mongoose from 'mongoose';

const initMongoDB = async () => {
  try {
    const DB_HOST =
      'mongodb+srv://sparkden4ik2:densmm21@cluster0.j55iygb.mongodb.net/contacts?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(DB_HOST);
    console.log('Connected successfully');
  } catch (error) {
    console.log(`Error connect to DB with ${error.message}`);
    throw error;
  }
};

export default initMongoDB;
