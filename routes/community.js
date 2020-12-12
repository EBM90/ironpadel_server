const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const allBookings = await Booking.find()
      .populate("date")
      .populate("players");

    allBookings.sort(function (a, b) {
      if (a.date.day < b.date.day) {
        return -1;
      } else if (a.date.day === b.date.day && a.hour < b.hour) {
        return -1;
      } else {
        return 1;
      }
    });

    res.json(allBookings);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

router.post("/addPlayer/:bookingId/:playerId", async (req, res, next) => {
  try {
    const theBooking = await Booking.findByIdAndUpdate(req.params.bookingId, {
      $push: { players: req.params.playerId },
    })
      .populate("date")
      .populate("players");
    const message = `You have joined the match ${theBooking.name}`;
    const notification = await Notification.create({ message });
    const user = await User.findByIdAndUpdate(req.params.playerId, {
      $push: { bookings: req.params.bookingId, notifications: notification },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error, "what is the error anyway???");
  }
});

module.exports = router;
