const { Schema, model } = require("mongoose");

const CustomerSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: String,
    lastName: String,
    phone: String,
  },
  { timestamps: true }
);

module.exports = model("customer", CustomerSchema);
