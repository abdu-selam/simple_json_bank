const { readData, writeData } = require("../utils/json");
const User = require("./user.model");

class Account {
  static #accounts = readData("acc");

  static async create(data) {
    if (Account.#accs().includes(data.account)) {
      return {
        status: false,
        type: "Acount created",
        code: 0,
      };
    }

    if (!User.acounts().includes(data.account)) {
      return {
        status: false,
        type: "Acount does not exist",
        code: 1,
      };
    }

    if (data.balance < 50) {
      return {
        status: false,
        type: "low balance",
        code: 2,
      };
    }

    const account = {
      account: "",
      balance: data.balance,
      history: [],
    };

    const file = this.#accounts.map((item) => ({ ...item }));
    file.push(account);
    writeData("acc", file);

    Account.#accounts = readData("user");
    return {
      status: true,
      data: account,
    };
  }

  static async send(senderAcc, recieverAcc, amount, reason) {
    const sender = Account.findByAccount(senderAcc);
    const reciever = Account.findByAccount(recieverAcc);
    if (!sender) {
      return {
        status: false,
        type: "Sender not exist",
        code: 0,
      };
    }

    if (!reciever) {
      return {
        status: false,
        type: "Sender not exist",
        code: 1,
      };
    }

    if (sender.balance < amount + 50) {
      return {
        status: false,
        type: "Low ballance",
        code: 2,
      };
    }

    const senderData = {
      account: sender.account,
      balance: sender.balance - amount,
      history: Account.#historyGen(amount, recieverAcc, reason),
    };

    const recieverData = {
      account: reciever.account,
      balance: reciever.balance + amount,
      history: Account.#historyGen(amount, senderAcc, reason, "recieve"),
    };

    await Account.#updateAcc(senderData);
    await Account.#updateAcc(recieverData);

    return Account.findByAccount(senderAcc);
  }

  static async #updateAcc(account) {
    const file = Account.#accounts.map((item) => {
      if (item.account === account.account) {
        item.balance = account.balance;
        item.history.push(account.history);
      }

      return item;
    });

    writeData("acc", file);

    Account.#accounts = readData("user");
  }

  static #historyGen(amount, other, reason, type = "send") {
    const date = new Date();
    const data = {
      type,
      other,
      amount,
      reason,
      date,
    };

    return data;
  }

  static #accs() {
    const acounts = Account.#accounts.map((item) => item.account);
    return acounts;
  }

  static findByAccount(account) {
    const acc = Account.#accounts.filter((item) => item.account === account);
    if (acc.length === 0) {
      return null;
    }

    return acc[0];
  }
}

module.exports = Account;
