const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(
    "mongodb+srv://nandha18kishore:Sanjay%4023@cluster0.kckv9.mongodb.net/",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );

  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("Mongo DB Connection Successful");
  });

  connection.on("error", () => {
    console.log("Mongo DB connection Error");
  });
}

connectDB();

module.exports = mongoose;
