const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { body, validationResult } = require('express-validator');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkUsername,
      verifySignUp.checkEmailIsValid,
      verifySignUp.checkPassword,
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", 
  [
    verifySignUp.checkEmailIsValid,
    verifySignUp.checkPassword,
  ],
  controller.signin
  );
};