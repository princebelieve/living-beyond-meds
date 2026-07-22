//server/src/models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: String,

  stripeSessionId: {
    type: String,
    unique: true,
  },

  amount: Number,
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
