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
}, { timestamps: true }); // adds createdAt & updatedAt

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
