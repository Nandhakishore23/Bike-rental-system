const express = require("express");
const router = express.Router();
const Bike = require("../models/bikeModel");

router.get("/getallbikes", async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.send(bikes);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addbike", async (req, res) => {
  try {
    const newbike = new Bike(req.body);
    await newbike.save();
    res.send("Bike added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/editbike", async (req, res) => {
  try {
    const bike = await Bike.findOne({ _id: req.body._id });
    bike.name = req.body.name;
    bike.image = req.body.image;
    bike.fuelType = req.body.fuelType;
    bike.rentPerHour = req.body.rentPerHour;
    bike.capacity = req.body.capacity;
    bike.location = req.body.location;

    await bike.save();

    res.send("Bike details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletebike", async (req, res) => {
  try {
    await Bike.findOneAndDelete({ _id: req.body.carid });

    res.send("Bike deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/rate", async (req, res) => {
  try {
    const { bikeId, userId, username, rating, comment } = req.body;

    const bike = await Bike.findOne({ _id: bikeId });
    if (!bike) return res.status(404).json({ error: "Bike not found" });

    const review = {
      user: userId,
      username,
      rating: Number(rating),
      comment
    };

    bike.reviews.push(review);
    await bike.save();

    res.send("Review added successfully");
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
