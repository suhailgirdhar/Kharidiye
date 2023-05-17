const mongoose = require("mongoose");

// ----------- CONNECT DATABASE -------------

exports.connectMongoose = () => {
  mongoose
    .connect("mongodb://localhost:27017/KharidiyeDB")
    .then(() => console.log("Connected to KharidiyeDB"))
    .catch((err) => console.log("Not Connected to DB or " + err));
};

// --------- PRODUCT SCHEMA -----------

const productSchema = mongoose.Schema({
  product_id: String,
  product_name: String,
})


// --------- ORDER SCHEMA -----------

const orderSchema = mongoose.Schema({
  product: String,
  qty: Number,
  paymentId: String,
  amount: String,
  currency: String,
  createdAt: String,
  name: String,
  contact: Number,
  house: String,
  city: String,
  state: String,
  pincode: Number,
});

// --------- USER SCHEMA -----------

const userSchema = mongoose.Schema({
  name: String,

  username: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true
  },
  
  password: {
    type: String,
    required: true
  },
  
  token: {
    type: String,
    default: "",
  },

  contact: Number,
  address: String,
  pincode: Number,
  
  cart: [],
  orders: [orderSchema],
});

// --------- USER MODEL -----------

exports.User = mongoose.model("KharidiyeUser", userSchema);

// --------- ORDER MODEL -----------

exports.Order = mongoose.model("Order", orderSchema);

// --------- PRODUCT MODEL -----------

exports.Product = mongoose.model("Product", productSchema);
