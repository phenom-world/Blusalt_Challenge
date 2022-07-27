const express = require("express");
const bodyParser = require("body-parser");
const connectToMongoDB = require("./config/database");
const { default: axios } = require("axios");
const { BILLING_SERVICE_URL } = process.env;

require("dotenv").config();

// connect database
connectToMongoDB();

const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sendRequest = async (customerId, amount) => {
  const response = await axios.post(`http://localhost:3001/update-details`, { customerId, amount });
  if (response.status !== 200) return false;
  return response;
};

// @desc      Deposits customer funds
// @route     POST /depositfunds
app.post("/depositfunds", async (req, res) => {
  const { customerId, amount } = req.body;
  const response = await sendRequest(customerId, amount);
  return res.json({ data: response.data, message: "Fund deposited succesfully." });
});

module.exports = app;
