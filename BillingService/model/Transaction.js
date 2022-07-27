const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, default: 0 },
    customerId: {
      type: String,
      ref: "customers",
      required: true,
    },
    inflow: Boolean,
    status: {
      type: String,
      required: [true, "payment status is required"],
      enum: ["success", "pending", "failed"],
      default: "pending",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("transaction", TransactionSchema);
