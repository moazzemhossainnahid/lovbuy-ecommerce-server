const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const dotenv = require("dotenv").config();

/**
 * 1. check if token exists
 * 2. if not token send res
 * 3. decode the token
 * 4. if valid next
 */

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    // console.log("token",token);
    if (!token) {
      return res.status(401).json({
        status: "fail",
        error: "You are not logged in"
      });
    }


    const decoded = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN_SECRET);

    // const user = User.findOne({ email: decoded.email })

    // console.log("decoded", decoded);

    req.user = decoded;

    next();


  } catch (error) {
    res.status(403).json({
      status: "fail",
      error: "Invalid token"
    });
  }
};