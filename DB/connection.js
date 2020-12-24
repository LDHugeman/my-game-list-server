const mongoose = require('mongoose');
const URI =
  'mongodb+srv://admin:admin@mygamelist-mongodb-server-2xcmh.mongodb.net/myGameList?retryWrites=true&w=majority';

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log('DB connected...');
};

module.exports = connectDB;
