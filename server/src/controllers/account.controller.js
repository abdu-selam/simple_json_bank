const Account = require("../models/account.model");
const User = require("../models/user.model");

const checkSend = async (req, res) => {
  try {
    const { body } = req;
    if (!body.account || !body.amount) {
      return res.status(409).json({
        message: "All fields required",
      });
    }

    const reacieverAcc = User.findByAccount(body.account);
    if (!reacieverAcc) {
      return res.status(409).json({
        message: "Invalid Reciever account",
      });
    }

    const senderAcc = Account.findByAccount(req.user.account);
    if (senderAcc.balance < body.amount + 50) {
      return res.status(401).json({
        message: "Less amount",
      });
    }

    res.status(200).json({
      reciever: {
        name: reacieverAcc.name,
        account: reacieverAcc.account,
      },
      amount: body.amount,
    });
  } catch (error) {
    console.log("Error on check send controller");
    console.log("============================");
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { checkSend };
