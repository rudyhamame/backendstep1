//For user data
const express = require("express");
const TestModel = require("../models/Test");
const UserModel = require("../models/Users");
const ChatModel = require("../models/Chat");
const UserRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const checkAuth = require("../check-auth");
const { Schema } = require("mongoose");
const PostsModel = require("../models/Posts");

//Login API
UserRouter.post("/login", function (req, res, next) {
  UserModel.findOne({
    "info.username": req.body.username,
  })
    .exec()
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.info.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              { username: user.info.username, userId: user._id },
              process.env.JWT_KEY,
              {
                expiresIn: "1h",
              }
            );
            res.status(201).json({
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
  let flag = true;
  UserModel.findOne({ "info.username": req.body.username })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (!err) {
            UserModel.create({
              "info.username": req.body.username,
              "info.password": hash,
              "info.firstname": req.body.firstname,
              "info.lastname": req.body.lastname,
              "info.email": req.body.email,
              "info.dob": req.body.dob,
            });
          }
        });
      } else {
        flag = false;
      }
    })
    .then(() => {
      if (flag == true) {
        res.status(201).json();
      } else {
        res.status(500).json();
      }
    })
    .catch(next);
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
UserRouter.get("/update/:id", function (req, res, next) {
  UserModel.findOne({ _id: req.params.id })
    .select(
      "token friends notifications chat posts terminology study_session status"
    )
    .populate("friends")
    .populate("chat")
    .populate("posts")
    .then((profile) => {
      res.status(200).json({
        chat: profile.chat.conversation,
        friends: profile.friends,
        info: profile.info,
        token: profile.token,
        notifications: profile.notifications,
        posts: profile.posts,
        terminology: profile.terminology,
        study_session: profile.study_session,
        isOnline: profile.status.isConnected,
      });
    })
    .catch(next);
});

/////Searching for a user to be a friend
UserRouter.get("/searchUsers/:name", function (req, res, next) {
  UserModel.find({})
    .select("info.firstname info.lastname info.username")
    .then((users) => {
      const array = [];
      users.forEach((user) => {
        if (
          user.info.firstname.includes(req.params.name) ||
          user.info.lastname.includes(req.params.name) ||
          user.info.username === req.params.name
        ) {
          array.push(user);
        }
      });
      return array;
    })
    .then((array2) => {
      res.status(200).json({
        array: array2,
      });
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

///////POST A POST//The best architecture
UserRouter.post("/posts/:my_id", function (req, res, next) {
  UserModel.findOne({ _id: req.params.my_id })
    .then((mine) => {
      mine.posts.push(req.body);
      return mine.save();
    })
    .then((result) => {
      if (result) {
        res.status(201).json(result.posts.pop());
      } else {
        res.status(500).json();
      }
    })
    .catch(next);
});
/////Searching in posts
UserRouter.get(
  "/searchPosts/:keyword/:subject/:category/:my_id",
  function (req, res, next) {
    UserModel.findOne({ _id: req.params.my_id })
      .then((mine) => {
        const array = [];
        mine.posts.forEach((post) => {
          PostsModel.findOne({ _id: post }).then((user) => {
            if (
              req.params.keyword !== "$" &&
              req.params.subject === "$" &&
              req.params.category === "$"
            ) {
              if (
                String(user.note).toLowerCase() ===
                  req.params.keyword.toLowerCase() ||
                String(user.note)
                  .toLowerCase()
                  .includes(req.params.keyword.toLowerCase())
              ) {
                array.push(user);
              }
            }
            if (
              req.params.keyword === "$" &&
              req.params.subject !== "$" &&
              req.params.category === "$"
            ) {
              if (user.subject === req.params.subject) {
                array.push(user);
              }
            }
            if (
              req.params.keyword === "$" &&
              req.params.subject === "$" &&
              req.params.category !== "$"
            ) {
              if (user.category === req.params.category) {
                array.push(user);
              }
            }
            if (
              req.params.keyword !== "$" &&
              req.params.subject !== "$" &&
              req.params.category === "$"
            ) {
              if (
                String(user.note).toLowerCase() ===
                  req.params.keyword.toLowerCase() ||
                String(user.note)
                  .toLowerCase()
                  .includes(
                    req.params.keyword.toLowerCase() &&
                      user.subject === req.params.subject
                  )
              ) {
                array.push(user);
              }
            }
            if (
              req.params.keyword !== "$" &&
              req.params.subject === "$" &&
              req.params.category !== "$"
            ) {
              if (
                String(user.note).toLowerCase() ===
                  req.params.keyword.toLowerCase() ||
                String(user.note)
                  .toLowerCase()
                  .includes(
                    req.params.keyword.toLowerCase() &&
                      user.category === req.params.category
                  )
              ) {
                array.push(user);
              }
            }
            if (
              req.params.keyword == "$" &&
              req.params.subject !== "$" &&
              req.params.category !== "$"
            ) {
              if (
                user.subject === req.params.subject &&
                user.category === req.params.category
              ) {
                array.push(user);
              }
            }
            if (
              req.params.keyword !== "$" &&
              req.params.subject !== "$" &&
              req.params.category !== "$"
            ) {
              if (
                String(user.note).toLowerCase() ===
                  req.params.keyword.toLowerCase() ||
                String(user.note)
                  .toLowerCase()
                  .includes(
                    req.params.keyword.toLowerCase() &&
                      user.subject === req.params.subject &&
                      user.category === req.params.category
                  )
              ) {
                array.push(user);
              }
            }
          });
        });
        return array;
      })
      .then((array2) => {
        console.log(array2);
        res.status(200).json({
          array: array2,
        });
      })
      .catch(next);
  }
);
//////////////Terminology post
UserRouter.post("/newTerminology/:my_id", function (req, res, next) {
  UserModel.findOne({ _id: req.params.my_id })
    .then((mine) => {
      mine.terminology.push(req.body);
      return mine.save();
    })
    .then((result) => {
      if (result) {
        res.status(201).json(result.terminology.pop());
      } else {
        res.status(500).json();
      }
    })
    .catch(next);
});

//////////////////////Posting update for a user before leaving app
UserRouter.put("/isOnline/:id", function (req, res, next) {
  UserModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      "status.isConnected": req.body.isConnected,
    },
    {
      useFindAndModify: false,
    }
  )
    .then((response) => {
      res.status(201).json(response);
    })
    .catch(next);
});
//////////////////////Posting update for a user before leaving app
UserRouter.put("/updateBeforeLeave/:id", function (req, res, next) {
  UserModel.findOne({ _id: req.params.id })
    .then((result) => {
      result.study_session.push(req.body.study_session);
      result.save();
    })
    .then((response) => {
      res.status(201).json(response);
    })
    .catch(next);
});

//////////////////////delete a term
UserRouter.delete(
  "/deleteTerminology/:termID/:my_id",
  function (req, res, next) {
    UserModel.findOne({ _id: req.params.my_id })
      .then((mine) => {
        for (var i = 0; i < mine.terminology.length; i++) {
          if (mine.terminology[i]._id == req.params.termID) {
            mine.terminology.splice(i, 1);
          }
        }
        return mine.save();
      })
      .then((result) => {
        if (result) {
          res.status(201).json();
          console.log(result);
        }
      })
      .catch(next);
  }
);
//////////////////////edit a term
UserRouter.put("/editTerminology/:termID/:my_id", function (req, res, next) {
  UserModel.findOne({ _id: req.params.my_id })
    .then((mine) => {
      for (var i = 0; i < mine.terminology.length; i++) {
        if (mine.terminology[i]._id == req.params.termID) {
          mine.terminology.splice(i, 1, req.body);
        }
      }
      return mine.save();
    })
    .then((result) => {
      if (result) {
        res.status(201).json();
        console.log(result);
      }
    })
    .catch(next);
});
///////////////////////////////////////////////TEST
UserRouter.post("/test", function (req, res, next) {
  TestModel.create(req.body)
    .then((result) => {
      if (result) {
        res.status(201).json();
      }
    })
    .catch(next);
});
//Attach all the routes to router\
module.exports = UserRouter;

//////////////Lecture post
UserRouter.post("/addLecture/:my_id", function (req, res, next) {
  UserModel.findOne({ _id: req.params.my_id })
    .then((mine) => {
      mine.studyplanner.lectures.push(req.body);
      return mine.save();
    })
    .then((result) => {
      if (result) {
        res.status(201).json(result.studyplanner.lectures.pop());
      } else {
        res.status(500).json();
      }
    })
    .catch(next);
});

//////////////RetriveLectures
UserRouter.get("/retrieveLectures/:my_id", function (req, res, next) {
  UserModel.findOne({ _id: req.params.my_id })
    .then((mine) => {
      res.status(200).json(mine.studyplanner.lectures);
    })
    .catch(next);
});
