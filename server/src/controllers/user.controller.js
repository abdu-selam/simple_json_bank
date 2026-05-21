const Account = require("../models/account.model");
const User = require("../models/user.model");
const { cookieGen } = require("../utils/cookie");

const register = async (req, res) => {
  try {
    const { body } = req;

    if (!body.name || !body.tell || !body.password || !body.balance) {
      return res.status(409).json({
        message: "All inputs required",
      });
    }

    if (body.balance < 50) {
      return res.status(401).json({
        message: "less balance",
      });
    }

    const user = await User.create(body);
    if (!user) {
      return res.status(403).json({
        message: "User exist",
      });
    }

    const acc = await Account.create({
      account: user.account,
      balance: body.balance,
    });

    const token = User.createToken(user.id);

    cookieGen(res, token);

    delete user.password;
    delete user.token;
    res.status(200).json({
      message: {
        name: user.name,
        account: user.account,
        code: user.code,
        balance: acc.balance,
      },
    });
  } catch (error) {
    console.log("Error on registor controller");
    console.log("============================");
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { register };
