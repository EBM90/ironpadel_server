const express = require("express");
const router = express.Router();
const Booking = require("../../models/booking");
const User = require("../../models/user");
const Date = require("../../models/date");
const Notification = require("../../models/Notification");

router.get("/", async (req, res, next) => {
  try {
    const theDates = await Date.find();
    res.json(theDates);
  } catch (error) {
    console.log(error);
    next(`${error}, this error`);
  }
});

router.get("/bookings", async (req, res, next) => {
  try {
    const theUser = await User.findById(req.session.currentUser._id)
      .populate("bookings")
      .populate("notifications");
    const allBookings = await Booking.find()
      .populate("players")
      .populate("date");
    const theUserBookings = [];

    allBookings.forEach(function (booking) {
      booking.players.forEach(function (player) {
        if (player.id == theUser.id) {
          theUserBookings.push(booking);
        }
      });
    });

    theUserBookings.sort(function (a, b) {
      if (a.date.day < b.date.day) {
        return -1;
      } else if (a.date.day === b.date.day && a.hour < b.hour) {
        return -1;
      } else {
        return 1;
      }
    });
    res.json(theUserBookings);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, date, hour, participants } = req.body;
    //create creator?
    const players = [];

    if (participants.length === 1) {
      const player1 = await User.findOne({ username: participants[0] });
      players.push(player1.id);
    } else if (participants.length === 2) {
      const player1 = await User.findOne({ username: participants[0] });
      const player2 = await User.findOne({ username: participants[1] });
      players.push(player1.id);
      players.push(player2.id);
    } else if (participants.length === 3) {
      const player1 = await User.findOne({ username: participants[0] });
      const player2 = await User.findOne({ username: participants[1] });
      const player3 = await User.findOne({ username: participants[2] });
      players.push(player1.id);
      players.push(player2.id);
      players.push(player3.id);
    } else if (participants.length === 4) {
      const player1 = await User.findOne({ username: participants[0] });
      const player2 = await User.findOne({ username: participants[1] });
      const player3 = await User.findOne({ username: participants[2] });
      const player4 = await User.findOne({ username: participants[3] });
      players.push(player1.id);
      players.push(player2.id);
      players.push(player3.id);
      players.push(player4.id);
    }

    const theDate = await Date.findByIdAndUpdate(date._id, {
      $pull: { available: hour },
    });

    const theBooking = await Booking.create({
      name,
      date: theDate._id,
      hour,
      players: players,
    });
    const message = `You have a match on the ${date.day} ${date.month} at ${theBooking.hour}`;
    const notification = await Notification.create({
      message,
      booking: theBooking._id,
    });
    // for loop with all the players
    players.forEach(async (player) => {
      const gamer = await User.findByIdAndUpdate(
        { _id: player },
        { $push: { bookings: theBooking._id, notifications: notification } }
      );
    });

    res.json(theBooking);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addPlayer/:bookingId/:playerId", async (req, res, next) => {
  try {
    const theGame = await Booking.findByIdAndUpdate(req.params.bookingId, {
      $addToSet: { players: req.params.playerId },
    })
      .populate("players")
      .populate("date");
    const user = await User.findByIdAndUpdate(req.params.playerId, {
      $addToSet: { bookings: req.params.bookingId },
    });
    const message = `${user.username} has joined your match ${theGame.name} on ${theGame.date.day} ${theGame.date.month} at ${theGame.hour} `;
    const notification = await Notification.create({
      message,
      booking: theGame._id,
    });
    const messageUser = `You have joined ${theGame.name} on ${theGame.date.day} ${theGame.date.month} at ${theGame.hour} `;
    const notificationUser = await Notification.create({
      message: messageUser,
      booking: theGame._id,
    });

    await User.findByIdAndUpdate(req.params.playerId, {
      $push: { notifications: notificationUser._id },
    });
    theGame.players.forEach(async (player) => {
      await User.findByIdAndUpdate(player, {
        $push: { notifications: notification },
      });
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error, "what is the error anyway???");
  }
});

// pull de la nueva hora, push de la antigua hora.
router.post("/:id/deleteBooking", async (req, res, next) => {
  try {

    const booking = await Booking.findById(req.params.id)
      .populate("players")
      .populate("date");
    const message = `Your game ${booking.name} on ${booking.date.day} ${booking.date.month} at ${booking.hour} has been cancelled`;
    const notification = await Notification.create({ message });
    booking.players.forEach(async (player) => {
      await User.findByIdAndUpdate(player, {
        $pull: { bookings: req.params.id },
      });
      await User.findByIdAndUpdate(player, {
        $push: { notifications: notification },
      });
    });
    const theDate = await Date.findByIdAndUpdate(booking.date._id, {
      $push: { available: booking.hour },
    });
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json(booking);
  } catch (error) {
    console.log(error, "what is the error anyway???");
  }
});

router.get("/:id", async (req, res, next) => {
  const thisBooking = await Booking.findById(req.params.id)
    .populate("players")
    .populate("date")
    .populate("winners");

  res.json(thisBooking);
});

router.post("/:id", async (req, res, next) => {

  const { name } = req.body;


  const thisBooking = await Booking.findByIdAndUpdate(req.params.id, {
    $set: { name },
  });

  res.json(thisBooking);
});

router.post("/deletePlayer/:bookingId/:playerId", async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.bookingId, {
      $pull: { players: req.params.playerId },
    })
      .populate("players")
      .populate("date");
    const messageUser = `You were kicked out of ${booking.name} on ${booking.date.day} ${booking.date.month} at ${booking.hour}`;
    const notificationUser = await Notification.create({
      message: messageUser,
      booking: booking._id,
    });
    const deletedUser = await User.findByIdAndUpdate(req.params.playerId, {
      $pull: { bookings: req.params.bookingId },
    });
    await User.findByIdAndUpdate(req.params.playerId, {
      $push: { notifications: notificationUser },
    });

    const messagePlayers = `${deletedUser.username} has left the ${booking.name} game on ${booking.date.day} ${booking.date.month} at ${booking.hour}`;
    const notificationPlayers = await Notification.create({
      message: messagePlayers,
    });

    booking.players.forEach(async (player) => {
      await User.findByIdAndUpdate(player, {
        $push: { notifications: notificationPlayers },
      });
    });

    res.status(200).json(booking);
  } catch (error) {
    console.log(error, "what is the error anyway???");
  }
});

router.post("/declarewinners/:id", async (req, res, next) => {
  try {
    const { winner1, winner2 } = req.body.winners;

    const userOne = await User.findByIdAndUpdate(winner1, {
      $inc: { wins: +1 },
    });
    const userTwo = await User.findByIdAndUpdate(winner2, {
      $inc: { wins: +1 },
    });
    const theBooking = await Booking.findByIdAndUpdate(req.params.id, {
      $addToSet: { winners: userOne._id },
    });
    await Booking.findByIdAndUpdate(req.params.id, {
      $addToSet: { winners: userTwo._id },
    });
    theBooking.players.forEach(async (player) => {
      await User.findByIdAndUpdate(player._id, { $inc: { games: +1 } });
    });
    res.status(200).json(theBooking);
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
