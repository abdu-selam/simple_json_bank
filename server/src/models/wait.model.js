const { readData, writeData } = require("../utils/json");
const User = require("./user.model");

class Wait {
  static #waits = readData("wait");
  static #timeoutes = {};

  static async create(data) {
    if (
      !User.acounts().includes(data.sender) ||
      !User.acounts().includes(data.reciever)
    ) {
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

    const pre = Wait.find(data.sender);
    if (!!pre) {
      await Wait.deleteWait(data.sender);
    }

    const account = {
      sender: data.sender,
      reciever: data.reciever,
      amount: data.amount,
    };

    const file = Wait.#waits.map((item) => ({ ...item }));
    file.push(account);
    writeData("wait", file);

    Wait.#timeoutes[data.sender] = setTimeout(() => {
      this.deleteWait(data.sender);
    }, 60000);

    Wait.#waits = readData("wait");
    return {
      status: true,
    };
  }

  static async deleteWait(acc) {
    const file = Wait.#waits.filter((item) => item.sender !== acc);
    writeData("wait", file);

    Wait.#waits = readData("wait");

    if (Wait.#timeoutes[acc]) {
      clearInterval(Wait.#timeoutes[acc]);
    }
  }

  static find(acc) {
    const data = Wait.#waits.filter((item) => item.sender === acc);
    if (data.length === 0) {
      return null;
    }

    return data[0];
  }
}

module.exports = Wait;
