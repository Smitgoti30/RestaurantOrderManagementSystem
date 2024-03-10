import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  date_time: { type: Date, required: true },
  status: { type: String, required: true },
  type: { type: String, required: true, enum: ["online", "dining"] },
  table_number: { type: Number },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
