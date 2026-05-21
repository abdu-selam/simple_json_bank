const { readData, writeData } = require("../utils/json");
const { idGen, cookieTokenGen, accGen, codeGen } = require("../utils/token");

class User {
  static #users = readData("user");

  static async create(data) {
    if (User.#tells().includes(data.tell)) {
      return null;
    }
    const user = {
      id: idGen(User.#ids()),
      name: data.name ?? "unknown",
      tell: data.tell,
      password: data.password,
      account: accGen(User.acounts()),
      code: codeGen(),
      token: null,
    };

    const file = this.#users.map((item) => ({ ...item }));
    file.push(user);
    writeData("user", file);

    User.#users = readData("user");
    return user;
  }

  static #tells() {
    const tells = User.#users.map((item) => item.tell);
    return tells;
  }

  static #ids() {
    const ids = User.#users.map((item) => item.id);
    return ids;
  }

  static acounts() {
    const acounts = User.#users.map((item) => item.account);
    return acounts;
  }

  static findById(id) {
    const user = User.#users.filter((item) => item.id === id);
    if (user.length === 0) {
      return null;
    }

    return user[0];
  }

  static tokenAdder(id, token) {
    const users = User.#users.map((item) => {
      if (item.id === id) {
        item.token = token ?? null;
      }

      return item;
    });

    writeData("user", users);
    User.#users = readData("user");
    return User.findById(data.id);
  }

  static findByToken(token) {
    const id = token.split("-")[0];
    const user = User.findById(id);
    const utoken = user?.token;

    if (token !== utoken) {
      return null;
    }

    return user;
  }

  static createToken(id) {
    const user = User.findById(id);
    if (!user) {
      return false;
    }

    const token = cookieTokenGen(id);
    User.tokenAdder(user.id, token);
    return token;
  }

  static findByTell(tell) {
    const user = User.#users.filter((item) => item.tell === tell);
    if (user.length === 0) {
      return null;
    }

    return user[0];
  }

  static findByAccount(account) {
    const user = User.#users.filter((item) => item.account === account);
    if (user.length === 0) {
      return null;
    }

    return user[0];
  }

  static validatePassword(id, password) {
    const user = User.findById(id);

    if (!user) {
      throw new TypeError("User does not exist");
    }

    return user.password === password;
  }

  static validateCode(id, code) {
    const user = User.findById(id);

    if (!user) {
      throw new TypeError("User does not exist");
    }

    return user.code === code;
  }
}

module.exports = User;
