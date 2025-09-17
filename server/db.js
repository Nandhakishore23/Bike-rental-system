const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(
    process.env.MongoDB_URL 
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
