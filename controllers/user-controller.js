require("dotenv").config;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const User = require('../db').import('../models/user-model');
const validateSession = require("../middleware/validate-session");

const router = Router();


router.post("/create", function (req, res) {
    User.create({
      email: req.body.user.email,
      password: bcrypt.hashSync(req.body.user.password, 5),
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      contentArea: req.body.user.contentArea,
      gradeLevel: req.body.user.gradeLevel,
      state: req.body.user.state,
      schoolName: req.body.user.schoolName,
      teacherOrStudent: req.body.user.teacherOrStudent,
      profileImage: req.body.user.profileImage,

    })
      .then(function createSuccess(user) {
        let token = jwt.sign({ id: user.id }, "i_am_secret", {
          expiresIn: 60 * 60 * 24,
        }); 
  
        res.status(200).json({
          user: user,
          message: "User successfully created!",
          sessionToken: token,
          teacherOrStudent: user.teacherOrStudent
        });
      }, function error(err){
        res.send(err)
      })
      .catch((err) => res.status(500).json({ error: err }));
  });

  router.post("/login", function (req, res) {
    User.findOne({
      where: {
        email: req.body.user.email,
      },
    })
      .then(function logInSuccess(user) {
        if (user) {
          bcrypt.compare(req.body.user.password, user.password, function (
            err,
            matches
          ) {
            if (matches) {
              let token = jwt.sign({ id: user.id }, "i_am_secret", {
                expiresIn: 60 * 60 * 24,
              });
  
              res.status(200).json({
                user: user,
                message: "User successfully logged in!",
                sessionToken: token,
                teacherOrStudent: user.teacherOrStudent
              });
            } else {
              res.status(502).send({ error: "Login Failed" });
            }
          });
        } else {
          res.status(500).json({ error: "User does not exist." });
        }
      })
      .catch((err) => res.status(500).json({ error: err }));
  });
  
  module.exports = router;