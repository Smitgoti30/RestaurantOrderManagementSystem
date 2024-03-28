import mongoose from "mongoose";

const receiptItemSchema = new mongoose.Schema({
  name: String, // Name of the item
  quantity: Number, // Quantity ordered
  price: Number, // Price per item at the time of order
  subTotal: Number, // Subtotal for this item (quantity * price)
  tax: Number, // Tax amount for this item
});

const receiptSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  customer: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    name: String,
    phone: String,
    email: String,
  },
  items: [receiptItemSchema], // Array of items ordered
  payment_method: { type: String, required: true },
  sub_total: { type: Number, required: true },
  tax_amount: { type: Number, required: true },
  total_amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Receipt = mongoose.model("Receipt", receiptSchema);
export default Receipt;
