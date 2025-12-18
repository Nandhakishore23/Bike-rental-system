const express = require("express");
const app = express();
require('dotenv').config();
const dbConnection = require("./db");
const port = process.env.PORT || 5000;
app.use(express.json());
var cors = require("cors");

const corsOption = {
    origin: ['https://bike-rental-system-two.vercel.app', 'http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}

app.use(cors(corsOption));
app.options('*', cors(corsOption)); // Enable preflight for all routes

const AdminLoginRoute = require("./routes/adminLogin");
const UserRoute = require("./routes/user");
const BikeRoute = require("./routes/bikes");
const BookingRoute = require("./routes/bookingRoute");

app.use("/api/bikes/", BikeRoute);
app.use("/api/users/", UserRoute);
app.use("/api/bookings/", BookingRoute);
app.use("/api/admin/", AdminLoginRoute);
app.use("/api/chatbot", require("./routes/chatbot"));

app.get("/", (req, res) => res.send("Bikes"));

app.listen(port, () => console.log(`server running on port ${port}`));
