const express = require("express");
const router = express.Router();
const Car = require("../models/bikeModel");

router.post("/addcar", async (req, res) => {
  try {
    const newcar = new Car(req.body);
    await newcar.save();
    res.send("Bike added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/editcar", async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body._id });
    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;

    await car.save();

    res.send("Bike details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletecar", async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carid });

    res.send("Bike deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
