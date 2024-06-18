import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const initMongoDB = async () => {
  try {
    //declare variables
    const user = env('MONGODB_USER');
    const password = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');
    //use it
    const DB_HOST = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(DB_HOST);
    console.log('Connected successfully');
  } catch (error) {
    console.log(`Error connect to DB with ${error.message}`);
    throw error;
  }
};

export default initMongoDB;
