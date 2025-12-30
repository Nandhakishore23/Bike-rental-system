const mongoose = require("mongoose");
const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
    },
    bookedTimeSlots: [
      {
        from: {
          type: String,
          required: true,
        },
        to: {
          type: String,
          required: true,
        },
      },
    ],
    rentPerHour: { type: Number, required: true },
    location: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
      address: { type: String, default: "Not Set" },
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
        username: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now }
      }
    ],
  },

  { timestamps: true }
);

const carModel = mongoose.model("cars", carSchema);
module.exports = carModel;
