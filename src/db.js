const mongoose = require('mongoose');

//setting strict query to false
mongoose.set('strictQuery', false);

const db = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log('DB connection successful');
  } catch (error) {
    console.log('DB connection failed', error);
  }
};

module.exports = db;
