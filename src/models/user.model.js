const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  postalCode: { type: String, required: true },
  prefecture: { type: String, required: true },
  city: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
});

const paymentInfoSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true },
  securityCode: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }, // You might want to hash this for security
  shippingAddress: { type: addressSchema, required: true },
  billingAddress: { type: addressSchema, required: true },
  paymentInfo: { type: paymentInfoSchema, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
