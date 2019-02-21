const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load user model
const User = require("../../models/user");

const teams = require("../../modules/teams");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  // form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // check for existing user
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists"});
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
      });
      // has password before saving to database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(async user => {
              console.log(user);
              // create default team
              await teams.createUserTeam(user._id);
              // create JWT payload
              const payload = {
                id: user.id,
                name: user.name
              };
              // sign token
              jwt.sign(
                payload,
                process.env.SECRET_OR_KEY,
                {
                  expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ emailnotfound: "Email not found"});
    } else {
      // check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // user matched
          // create JWT payload
          const payload = {
            id: user.id,
            name: user.name
          };
          // sign token
          jwt.sign(
            payload,
            process.env.SECRET_OR_KEY,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({ passwordIncorrect: "Password incorect"});
        }
      })
    }
  });
});

module.exports = router;