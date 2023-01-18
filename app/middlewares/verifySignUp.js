const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const { body, validationResult } = require('express-validator');

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

checkEmailIsValid = (req, res, next) => {  
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if(!req.body.email){
    res.status(400).send({
      message: `email is required`
    });
    return;
  }
  else if(!emailRegexp.test(req.body.email)){
    res.status(400).send({
      message: `Invalid email`
    });
    return;
  }
  next();
};

checkPassword = (req , res , next) => {
  const passRegexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if(!req.body.password){
    res.status(400).send({
      message: `Password is required`
    });
    return;
  }
  else if(!passRegexp.test(req.body.password)){
    res.status(400).send({
      message: `Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character`
    });
    return;
  }
  next();
}

checkUsername = (req , res , next) => {
  const uname = req.body.username;
  if(!req.body.username){
    res.status(400).send({
      message: `Username is required`
    });
    return;
  }
  else if(uname.length < 3){
    res.status(400).send({
      message: `username atleast 3 character long`
    });
    return;
  }
  next();
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkEmailIsValid,
  checkPassword,
  checkUsername
};

module.exports = verifySignUp;