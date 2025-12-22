// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });
// const userModel = mongoose.model("user", userSchema);

// module.exports = userModel;


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // prevent duplicate usernames
  },
  email: {
    type: String,
    required: true,
    unique: true, // prevent duplicate emails
  },
  password: {
    type: String,
    required: true,
  },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  licenseUrl: { type: String, default: "" },
  licenseNumber: { type: String, default: "" },
  licenseExpiry: { type: String, default: "" },
  dob: { type: String, default: "" },
  aadhaar: { type: String, default: "" },
  emergencyContact: { type: String, default: "" },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true }); // adds createdAt & updatedAt

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
