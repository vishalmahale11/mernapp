const mongoose = require("mongoose");

const connection = () => {
  console.log("COnnect to MongoDb");
  return mongoose.connect(process.env.MONGODB_URL);
};

module.exports = connection;
