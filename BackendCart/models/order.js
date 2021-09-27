const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      productData: {
        type: Object,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
});

const order = mongoose.model("order", orderSchema);
module.exports = order;
