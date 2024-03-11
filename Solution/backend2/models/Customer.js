import mongoose from "mongoose";

const uri =
  "mongodb+srv://smitgoti2103:Smit@cluster0.ztqnnsj.mongodb.net/RestaurantOrder?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      "===============================Connected to Mongodb Successfully !!!============================="
    );
  })
  .catch((err) => {
    console.log(
      `######### not Connected due to the error below ##########\n${err}`
    );
  });

const customerSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: Number },
  email: { type: String, required: true },
  type: { type: String, required: true, default: "online" }, // online // dining
  password: { type: String },
});

const Customer = mongoose.model("customer", customerSchema);

export default Customer;
