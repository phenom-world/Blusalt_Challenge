const express = require("express");
const amqp = require("amqplib");
const connectToMongoDB = require("./config/database");

require("dotenv").config();
connectToMongoDB();

const app = express();

app.use(express.json());

let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

var channel, connection;
async function connect() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("BILLING WORKER");
}

// dummy charge method
const dummyCharge = async (amount) => {
  await sleep(100);
  const charge = amount * 0.05;
  const depositedfunds = amount - charge;
  return { depositedfunds, charge };
};

connect().then(() => {
  channel.consume("BILLING WORKER", async (data) => {
    const transaction = JSON.parse(data.content);

    const { depositedfunds, charge } = await dummyCharge(transaction.amount);

    transaction.amount = depositedfunds;
    transaction.charge = charge;
    transaction.status = "success";
    channel.ack(data);

    await channel.sendToQueue("BILLING SERVICE", Buffer.from(JSON.stringify(transaction)));
  });
});

module.exports = app;
