var jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "Pa$$w0rd";

const featchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using valid token." });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    const userId = data.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Please authenticate using valid token." });
    }
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Please authenticate using valid token." });
  }
};

module.exports = featchuser;
