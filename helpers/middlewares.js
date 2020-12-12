const createError = require("http-errors");

// Si el usuario está logged
exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) next();
  else next(createError(401));
};

// Si el usuario no está logged
exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) next();
  else next(createError(403));
};

// Comprueba que el usuario o el password no estén vacíos
exports.validationLoggin = () => (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) next(createError(400));
  else next();
};
