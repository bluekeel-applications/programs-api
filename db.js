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
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0 // and MongoDB driver buffering
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
