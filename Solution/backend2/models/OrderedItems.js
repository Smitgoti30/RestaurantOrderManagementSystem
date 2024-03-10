import mongoose from "mongoose";

const orderedItemsSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  menu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderedItems = mongoose.model("OrderedItems", orderedItemsSchema);
export default OrderedItems;
