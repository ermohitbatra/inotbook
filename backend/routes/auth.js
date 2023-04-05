const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Name must be at least 5 characters").isLength({ min: 5 }),
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(400).json({error: "Please enter a unique value for email.", message: err.message })
      });
  }
);

module.exports = router;
