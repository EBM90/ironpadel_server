const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");

// Helper functions from middleare
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require("../helpers/middlewares");

// * @Post route - /signup
router.post(
  "/signup",
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { username, password, email } = req.body;
    try {
      // chequea si el username ya existe en la BD
      const usernameExists = await User.findOne({ username }, "username");
      const emailExists = await User.findOne({ email }, "email");
      if (usernameExists || emailExists) {
        return next(createError(400));
      } else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        // Crea un nuevo usuario
        const newUser = await User.create({
          username: username,
          email: email,
          password: hashPass,
        });
        // luego asignamos el nuevo documento user a req.session.currentUser y luego enviamos la respuesta en json
        req.session.currentUser = newUser;
        res
          .status(200) //  OK
          .json(newUser);
      }
    } catch (error) {
      next(`${error}, this error`);
    }
  }
);

// * @Login route - /login
router.post(
  "/login",
  validationLoggin(),
  isNotLoggedIn(),
  async (req, res, next) => {
    const { username, password } = req.body;

    try {
      // Saber si el usuario existe
      const user = await User.findOne({ username }).populate("bookings");

      if (!user) {
        next(createError(404));
        // Si existe comparamos passwords
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.status(200).json(user);
        return;
      } else {
        next(createError(401));
      }
    } catch (error) {
      next(error);
    }
  }
);

// * @Logout route - /logout
router.post("/logout", isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  res.status(204).send();
  return;
});

// * @Private route - /private
router.get("/private", isLoggedIn(), (req, res, next) => {
  res
    .status(200) // OK
    .json({ message: "Test - User is logged in" });
});

// * @Me route - /me
router.get("/me", isLoggedIn(), (req, res, next) => {
  // si está logueado, previene que el password sea enviado
  req.session.currentUser.password = "*";
  // evuelve un json con los datos del usuario
  res.json(req.session.currentUser);
});
module.exports = router;
