const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "Pa$$w0rd";
router.post(
  "/createuser",
  body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Name must be at least 5 characters").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this email alreay exist." });
      }
      const salt = await bcrypt.genSaltSync(10);
      secPass = await bcrypt.hash(req.body.password, salt)
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user:{
        id : user.id
    }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
      res.json({authtoken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

module.exports = router;
