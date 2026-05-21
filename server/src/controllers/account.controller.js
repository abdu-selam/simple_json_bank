const Account = require("../models/account.model");
const User = require("../models/user.model");
const Wait = require("../models/wait.model");
const { dateGen } = require("../utils/token");

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

    await Wait.create({
      sender: req.user.account,
      reciever: body.account,
      amount: body.amount,
    });

    res.status(200).json({
      reciever: {
        name: reacieverAcc.name,
        account: reacieverAcc.account,
      },
      amount: body.amount,
      message: "please send confirmation code in 2 minute",
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

const send = async (req, res) => {
  try {
    const { body } = req;

    if (!body.reason || !body.code) {
      return res.status(409).json({
        message: "All fields required",
      });
    }

    try {
      const isCode = User.validateCode(req.user.id, body.code);
      if (!isCode) {
        return res.status(409).json({
          message: "Invalid cridentials",
        });
      }
    } catch (error) {
      return res.status(409).json({
        message: "Invalid cridentials",
      });
    }

    const wait = Wait.find(req.user.account);

    if (!wait) {
      return res.status(409).json({
        message: "Expired",
      });
    }

    const sendData = await Account.send(
      wait.sender,
      wait.reciever,
      wait.amount,
      body.reason,
    );
    const newData = Account.findByAccount(wait.sender);
    const recieverData = User.findByAccount(wait.reciever);

    res.status(200).json({
      reciever: {
        name: recieverData.name,
        account: recieverData.account,
      },
      amount: wait.amount,
      current: newData.amount,
      transaction_code: sendData.tr_code,
    });
  } catch (error) {
    console.log("Error on send controller");
    console.log("============================");
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const history = (req, res) => {
  try {
    const accountData = Account.findByAccount(req.user.account);

    const historyList = accountData.history.map((his) => {
      const other = User.findByAccount(his.other);
      const data = {
        amount: his.amount,
        reason: his.reason,
        fdate: dateGen(his.date),
        tr_code: his.tr_code,
        status: his.type,
        other: {
          name: other.name,
          account: other.account,
        },
      };

      return data;
    });

    res.status(200).json({
      message: historyList,
    });
  } catch (error) {
    console.log("Error on history controller");
    console.log("============================");
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { checkSend, send, history };
