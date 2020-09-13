let mongoose = require("mongoose");
let express = require("express");
let router = express.Router();

// User Model
let userSchema = require("../models/User");

// Create User
router.route("/create-user").post((req, res, next) => {
  userSchema.create(req.body, (err, data) => {
    if (err) {
      return next(err);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// Read Users
router.route("/").get((req, res) => {
  userSchema.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      res.json(data);
    }
  });
});

// Get Single User
router.route("/edit-user/:id").get((req, res) => {
  userSchema.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.json(data);
    }
  });
});

// Update user
router.route("/update-user/:id").put((req, res, next) => {
  userSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, data) => {
      if (err) {
        return next(err);
      } else {
        res.json(data);
        console.log("User Updated!");
      }
    }
  );
});

router.route("/delete-user/:id").delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
