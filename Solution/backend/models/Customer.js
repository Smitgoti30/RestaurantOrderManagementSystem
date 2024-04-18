import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: Number },
  email: { type: String, required: true },
  type: { type: String, required: true, default: "online" }, // online // dining
  password: { type: String },
  verificationCode: { type: String },
});

const Customer = mongoose.model("customer", customerSchema);

export default Customer;
