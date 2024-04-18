import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  date_time: { type: Date, required: true, default: Date.now },
  status: { type: String },
  type: { type: String, enum: ["online", "dining"] },
  table_number: { type: Number },
  total:{type:Number}
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
