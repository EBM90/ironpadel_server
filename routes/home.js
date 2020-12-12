const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/main", async (req, res, next) => {
  try {
    if (!req.session.currentUser) {
      next();
    } else {
      const theUser = await User.findById(req.session.currentUser._id)
        .populate("bookings")
        .populate("notifications");
      // we get the notifications from here
      req.session.currentUser = theUser;
      res.json(theUser);
    }
  } catch (error) {
    console.log(error);
    next(`${error}, this error`);
  }
});

router.post("/notificationDelete/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.session.currentUser._id, {
      $pull: { notifications: req.params.id },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(`${error}, this error`);
  }
});

module.exports = router;
