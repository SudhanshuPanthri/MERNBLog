const mongoose = require("mongoose");
require("dotenv").config();
const connect = async () => {
  try {
    const response = await mongoose.connect(process.env.URL);
    console.log("DATABASE CONNECTED");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
