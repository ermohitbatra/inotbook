const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const featchuser = require("../middleware/featchuser");

const JWT_SECRET = "Pa$$w0rd";

//create user"/api/auth/createuser"
router.post(
  "/createuser",[
  body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Name must be at least 5 characters").isLength({ min: 5 })],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "User with this email alreay exist." });
      }
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

//Authenticate user "/api/auth/login"
router.post(
  "/login",[
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cann't be blank").exists()],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success, error: "Please login with valid credentials." });
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res
          .status(400)
          .json({success, error: "Please login with valid credentials." });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

//Get login user details "/api/auth/getuser"
router.post(
    "/getuser",
    featchuser,
    async (req, res) => {
      try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.json({ user })
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured.");
      }
    }
  );

module.exports = router;
