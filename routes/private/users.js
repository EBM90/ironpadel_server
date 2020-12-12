const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Achievement = require("../../models/Achievement");
const topCloud = require("../../config/cloudinary");

router.get("/", async (req, res, next) => {
  try {
    const theUsers = await User.find();
    res.json(theUsers);
  } catch (error) {
    console.log(error);
    next(`${error}, this error`);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const theUser = await User.findById(id).populate("achievements");

    if (theUser.wins === 1) {
      const first = await Achievement.findOne({
        name: "The start of something epic",
      });

      await User.findByIdAndUpdate(id, {
        $addToSet: { achievements: first._id },
      });
    }

    if (theUser.wins === 5) {
      const first = await Achievement.findOne({ name: "High five!" });

      await User.findByIdAndUpdate(id, {
        $addToSet: { achievements: first._id },
      });
    }

    if (theUser.wins === 10) {
      const first = await Achievement.findOne({ name: "Unstoppable" });

      await User.findByIdAndUpdate(id, {
        $addToSet: { achievements: first._id },
      });
    }

    if (theUser.games === 1) {
      const first = await Achievement.findOne({ name: "First step" });

      await User.findByIdAndUpdate(id, {
        $addToSet: { achievements: first._id },
      });
    }

    if (theUser.games === 10) {
      const first = await Achievement.findOne({ name: "Fantastic start" });

      await User.findByIdAndUpdate(id, {
        $addToSet: { achievements: first._id },
      });
    }

    res.json(theUser);
  } catch (error) {
    console.log(error);
    next(`${error}, this error`);
  }

  //Two conditions: loggedIn and OwnProfile = Edit, else View - DONE?
});

router.post("/uploadpicture", topCloud.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
});

router.post("/:id", async (req, res, next) => {
  try {
    const { username, email, description, image } = req.body;
    const theUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { username, email, description, image } }
    );

    res.json(theUser);
  } catch (error) {
    console.log(error);
    next(`${error}, this error`);
  }
});

module.exports = router;
