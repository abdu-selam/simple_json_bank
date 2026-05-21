const User = require("../models/user.model");

const protected = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "token missed",
      });
    }

    if (token.exp < Date.now()) {
      res.clearCookie("token");
      return res.status(401).json({
        message: "token missed",
      });
    }

    const user = User.findByToken(token);
    if (!user) {
      return res.status(409).json({
        message: "Invalid Token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error on protected middleware");
    console.log("============================");
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { protected };
