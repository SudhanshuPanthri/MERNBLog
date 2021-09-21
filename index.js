const express = require("express");
const bodyParser = require("body-parser");
const connect = require("./config/db");
const router = require("./routes/userRoute");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

// connecting the mongoDB database
const app = express();
connect();
app.use(bodyParser.json()); // => Middleware
app.use("/", router);

app.listen(PORT, () => {
  console.log("HOME ROUTE");
});
