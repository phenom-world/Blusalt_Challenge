const express = require("express");
const connectToMongoDB = require("./config/database");
const Transaction = require("./model/Transaction");
const amqp = require("amqplib");
const bodyParser = require("body-parser");

require("dotenv").config();

// connect database
connectToMongoDB();

const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// create transaction
const createTransaction = async (customerId, amount) => {
  try {
    const transaction = await Transaction.create({
      amount,
      customerId,
      isInflow: true,
    });
    return transaction;
  } catch (error) {
    console.log(error);
  }
};

// update transaction status
const updateTransaction = async (transactionId, status, charge) => {
  try {
    const txn = await Transaction.findByIdAndUpdate(transactionId, { $set: { status: status, charge: charge } }, { new: true });
    return txn;
  } catch (error) {
    console.log(error);
  }
};

// amqpServer connection: provides a way for connections to multiplex over a single TCP connection
async function connect() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("BILLING SERVICE");
}
connect();

var txn;

// @desc      Creates and updates transaction details
// @route     POST /update-details
app.post("/update-details", async (req, res) => {
  const { customerId, amount } = req.body;

  const transaction = await createTransaction(customerId, amount);

  await channel.sendToQueue("BILLING WORKER", Buffer.from(JSON.stringify(transaction)));

  channel.consume("BILLING SERVICE", async (data) => {
    const transaction = JSON.parse(data.content);
    const updatedTransaction = await updateTransaction(transaction._id, transaction.status, transaction.charge);

    return res.json({ data: updatedTransaction, message: "Transaction completed." });
  });
});

module.exports = app;
