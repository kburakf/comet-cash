import dotenv from 'dotenv';

dotenv.config();

export default {
  server: {
    port: process.env.SERVER_PORT || 3000,
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase',
  },
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
    defaultOffset: 0,
  },
};
