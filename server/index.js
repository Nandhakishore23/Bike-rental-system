const express = require("express");
const app = express();
require('dotenv').config();
const dbConnection = require("./db");
const port = process.env.PORT || 5000;
app.use(express.json());
var cors = require("cors");

const corsOption = {
    origin: process.env.Backend_URL,
    methods: 'GET,PUT,POST,DELETE,HEAD,PATCH,'
}

app.use(cors(corsOption));

const AdminLoginRoute = require("./routes/adminLogin");
const UserRoute = require("./routes/user");
const BikeRoute = require("./routes/bikes");
const BookingRoute = require("./routes/bookingRoute");

app.use("/api/bikes/", BikeRoute);
app.use("/api/users/", UserRoute);
app.use("/api/bookings/", BookingRoute);
app.use("/api/admin/", AdminLoginRoute);

app.get("/", (req, res) => res.send("Bikes"));

app.listen(port, () => console.log(`server running on port ${port}`));
