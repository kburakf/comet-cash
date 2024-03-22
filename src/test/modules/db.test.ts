import mongoose from 'mongoose';
import { connectToMongo } from '../../modules/db';
import config from '../../config';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('connectToMongo', () => {
  beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();
    process.exit = jest.fn() as any;
  });

  it('should connect to MongoDB successfully', async () => {
    (mongoose.connect as jest.Mock).mockResolvedValueOnce('connected');

    await connectToMongo();

    expect(mongoose.connect).toHaveBeenCalledWith(config.mongodb.uri);
    expect(console.log).toHaveBeenCalledWith('MongoDB connected');
  });

  it('should handle MongoDB connection error', async () => {
    const error = new Error('Connection failed');
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(error);

    await connectToMongo();

    expect(mongoose.connect).toHaveBeenCalledWith(config.mongodb.uri);
    expect(console.error).toHaveBeenCalledWith(
      'MongoDB connection error:',
      error
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
