const fs = require("fs");

const root = "./db";

const dataType = {
  user: `${root}/users.json`,
  acc: `${root}/accounts.json`,
};

const readData = (type) => {
  if (![...Object.keys(dataType)].includes(type)) {
    throw new TypeError("Type is not valid type");
  }
  const file = dataType[type];

  if (!fs.existsSync(file)) {
    writeData(type, []);
    return [];
  }
  const json = fs.readFileSync(file, "utf-8");
  const data = JSON.parse(json);

  return data;
};

const writeData = (type, data) => {
  if (![...Object.keys(dataType)].includes(type)) {
    throw new TypeError("Type is not valid type");
  }
  const file = dataType[type];

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
