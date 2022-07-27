const mongoose = require("mongoose");
const { seedCustomer } = require("../seeder");

const connectToMongoDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to customer service database...");
    if (process.env.NODE_ENV !== "production") {
      await seedCustomer();
    }
  } catch (error) {
    console.log(`Could not connect to database ${error}`);
  }
};

module.exports = connectToMongoDB;
