import mongoose from "mongoose";

const receiptItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  subTotal: Number,
  tax: Number,
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
  items: [receiptItemSchema], 
  payment_method: { type: String, required: true },
  sub_total: { type: Number, required: true },
  tax_amount: { type: Number, required: true },
  total_amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Receipt = mongoose.model("Receipt", receiptSchema);
export default Receipt;
