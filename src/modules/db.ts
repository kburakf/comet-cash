import mongoose from 'mongoose';

import config from '../config';

export const connectToMongo = async () => {
  try {
    await mongoose.connect(config.mongodb.uri);

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);

    process.exit(1);
  }
};
