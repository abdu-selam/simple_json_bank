const ENV = require("./env");

const cookieGen = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    maxAge: 60 * 60 * 1000,
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
  });
};

module.exports = { cookieGen };
