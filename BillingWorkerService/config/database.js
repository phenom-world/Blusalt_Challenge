const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to billing service worker database...");
  } catch (error) {
    console.log(`Could not connect to database ${error}`);
  }
};

module.exports = connectToMongoDB;
