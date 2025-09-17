const mongoose = require("mongoose");
const User = require("./models/userModel"); // adjust path if needed
require('dotenv').config();

// Connect to your MongoDB Atlas
mongoose.connect(process.env.MongoDB_URL);

async function updateEmail() {
  try {
    // Example: update ONE user by username
    const user = await User.findOneAndUpdate(
      { username: "ttt" }, // filter
      { $set: { email: "test2@example.com" } }, // update
      { new: true } // return updated document
    );

    console.log("✅ Updated user:", user);
    process.exit();
  } catch (err) {
    console.error("❌ Error updating:", err);
    process.exit(1);
  }
}

updateEmail();
