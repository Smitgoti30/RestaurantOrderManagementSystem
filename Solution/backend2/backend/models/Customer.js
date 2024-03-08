import mongoose from "mongoose";

const uri =
  "mongodb+srv://dpampatel:Conestoga@cluster0.rhp25qd.mongodb.net/ROMS?retryWrites=true&w=majority";
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
  type: { type: String, required: true }, // online // dining
  password: { type: String, required: true },
});

const Customer = mongoose.model("employee", customerSchema);

export default Customer;
