import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  date_time: { type: Date, required: true, default: Date.now },
  status: { type: String, required: true },
  type: { type: String, required: true, enum: ["online", "dining"] },
  table_number: { type: Number },
  // items: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "OrderedItems",
  //   },
  // ],
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
