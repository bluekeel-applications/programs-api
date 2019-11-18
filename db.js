const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let isConnected;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }

  console.log('=> using new database connection');
  const db = await mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  });
  isConnected = db.connections[0].readyState;
};

export default connectToDatabase;
