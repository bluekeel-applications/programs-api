const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let isConnected;

const connectToDatabase = async () => {

  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }

  try {
    console.log('=> using new database connection');
    const db = await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useFindAndModify: false,
      bufferCommands: false,
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    });
    isConnected = db.connections[0].readyState;

    db.connections[0].on('error', err => {
      console.log('Error:', err);
    });

  } catch (error) {
    console.log('error:', error);
    return(error);
  }
};

export default connectToDatabase;
