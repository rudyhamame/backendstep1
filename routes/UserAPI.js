//For user data
const express = require("express");
const UserModel = require("../models/Users");
const UserRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const checkAuth = require("../check-auth");

//Login API
UserRouter.post("/login", function (req, res, next) {
  UserModel.findOne({
    "info.username": req.body.username,
  })
    .exec()
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.info.password, (err, result) => {
          if (err) {
            res.status(401).json({
              message: "Login failed",
            });
          }
          if (result) {
            const token = jwt.sign(
              { username: user.info.username, userId: user._id },
              process.env.JWT_KEY,
              {
                expiresIn: "1h",
              }
            );
            res.status(201).json({
              message: "Login successful",
              token: token,
              user: user,
            });
          } else {
            res.status(401).json({
              message: "Authorized failed",
            });
          }
        });
      } else {
        res.status(401).json({
          message: "Authorized failed",
        });
      }
    })
    .catch(next);
});

//SignUp API
UserRouter.post("/signup", function (req, res, next) {
  UserModel.findOne({ "info.username": req.body.username })
    .exec()
    .then((user) => {
      if (user) {
        res.status(409).json({
          message:
            "Username is already taken. Please try again using another username",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err,
            });
          } else {
            UserModel.create({
              "info.username": req.body.username,
              "info.password": hash,
              "info.firstname": req.body.firstname,
              "info.lastname": req.body.lastname,
              "info.email": req.body.email,
              "info.dob": req.body.dob,
            })
              .then(() => {
                res.status(201).json({
                  message: "Your account has been created successfully!",
                });
              })
              .catch(next);
          }
        });
      }
    });
});
//PrepareMyChat

UserRouter.put("/addNew/:my_id", function (req, res, next) {
  UserModel.findByIdAndUpdate(
    { _id: req.params.my_id },
    { chat: req.params.my_id },
    {
      useFindAndModify: false,
    }
  )
    .exec()
    .then((response) => {
      res.json(response);
    });
});

//Modifiying User's Connection Status
UserRouter.put("/connection/:id", function (req, res, next) {
  UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    useFindAndModify: false,
  })
    .then((result) => res.json(result))
    .catch(next);
});

////////UpdateUser
UserRouter.get("/update/:id", checkAuth, function (req, res, next) {
  UserModel.findOne({ _id: req.params.id })
    .select("token notes friends friend_requests notifications chat posts")
    .populate("friends", "info.firstname info.lastname status.isConnected")
    .populate("chat")
    .then((profile) => {
      res.status(200).json(profile);
    })
    .catch(next);
});

/////Searching for a user to be a friend
UserRouter.get("/searchUsers/:name", function (req, res, next) {
  UserModel.find({ $text: { $search: req.params.name } })
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

// Requesting a friend
UserRouter.post("/addFriend/:username/", checkAuth, function (req, res, next) {
  UserModel.findOne({ "info.username": req.params.username })
    .then((user) => {
      user.notifications.push({
        id: req.body.id,
        message: req.body.message,
      });
      return user.save();
    })
    .then(() => {
      res.status(201).json({
        message: "Request sent!",
      });
    })
    .catch(next);
});

////////ACCEPT REQUEST JUST ONE TIME
UserRouter.post("/acceptFriend/:my_id/:friend_id", function (req, res, next) {
  UserModel.findOne({ _id: req.params.my_id })
    .then((user) => {
      let conflict = false;
      user.friends.forEach((friend) => {
        if (friend == req.params.friend_id) {
          conflict = true;
        }
      });
      if (conflict == true) {
        return res.status(409).json({
          message: "You're already friends",
        });
      } else {
        return conflict;
      }
    })
    .then((result) => {
      if (result == false) {
        UserModel.findOne({ _id: req.params.my_id })
          .then((user) => {
            user.friends.push({
              _id: req.params.friend_id,
            });
            user.save();
          })
          .then(() => {
            UserModel.findOne({
              _id: req.params.friend_id,
            }).then((user) => {
              user.friends.push({
                _id: req.params.my_id,
              });
              user.save();
            });
            res.status(201).json({
              message: "Request accepted. You're now friends!",
            });
          });
      }
    });
});

///////Update Notification INFO USER
UserRouter.put("/editUserInfo/:me_id/:friend_id", function (req, res, next) {
  UserModel.findOne({ _id: req.params.me_id })
    .then((user) => {
      user.notifications.forEach((notification) => {
        if (notification.id == req.params.friend_id) {
          notification.status = "read";
          user.save();
        }
      });
    })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(next);
});

/////////////Update User isConnected status
UserRouter.put("/connection/:id", function (req, res, next) {
  UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    useFindAndModify: false,
  })
    .then(function (result) {
      res.json(result);
    })
    .catch(next);
});

///////SENDING MESSAGE TO FRIEND
UserRouter.post("/chat/send/:friendID", function (req, res, next) {
  UserModel.findOne({ _id: req.params.friendID })
    .then((friend) => {
      friend.chat.push(req.body);
      friend.save();
    })
    .then((response) => {
      res.status(201).json(response);
    })
    .catch(next);
});

///////POST A POST
UserRouter.post("/posts/:my_id", function (req, res, next) {
  UserModel.findOne({ _id: req.params.my_id })
    .then((mine) => {
      mine.posts.push(req.body);
      mine.save(function (err) {
        if (err) {
          return res.status(500).json();
        }
      });
    })
    .catch(next);
});

//Attach all the routes to router\
module.exports = UserRouter;
