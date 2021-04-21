const mongoose = require("mongoose");
const keys = require("../config/keys");

const database = async () => {
  try {
    await mongoose.connect(keys.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log("database connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = database;
