import User from '../db/models/User.js';

export const signup = async (data) => User.create(data);
