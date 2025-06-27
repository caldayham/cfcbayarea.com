import mongoose, { ConnectOptions } from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Please add your MongoDB URI to .env.local');

  try {
    // Pass only modern options you actually need (everything below is optional)
    const opts: ConnectOptions = {
      // example: dbName: process.env.DB_NAME,
      // example: authSource: 'admin',
    };

    const db = await mongoose.connect(uri, opts);
    isConnected = db.connections[0].readyState === 1;
    console.log('MongoDB connected successfully');
    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};


/**
 * Disconnect from MongoDB
 */
export const disconnectDB = async () => {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    throw error;
  }
};

/**
 * Get connection status
 */
export const getConnectionStatus = () => {
  return {
    isConnected,
    readyState: mongoose.connection.readyState,
    states: {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    }
  };
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
  isConnected = false;
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed due to app termination');
  process.exit(0);
});

export default mongoose;