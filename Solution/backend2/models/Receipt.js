import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  sub_total: { type: Number, required: true },
  tax_amount: { type: Number, required: true },
  total_amount: { type: Number, required: true },
  payment_mode: { type: String, required: true },
});

const Receipt = mongoose.model("Receipt", receiptSchema);
export default Receipt;
