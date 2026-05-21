const { configDotenv } = require("dotenv");

configDotenv();

const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
};

module.exports = env;
