const idGen = (ids) => {
  let id = "";
  const letters = "0123456789";
  const len = letters.length;

  for (let i = 0; i < 8; i++) {
    const rand = Math.floor(Math.random() * len);
    id += letters.slice(rand, rand + 1);
  }

  if (ids.includes(id)) {
    idGen(ids);
  }

  return id;
};

const codeGen = () => {
  let code = "";
  const letters = "0123456789";
  const len = letters.length;

  for (let i = 0; i < 6; i++) {
    const rand = Math.floor(Math.random() * len);
    code += letters.slice(rand, rand + 1);
  }

  return code;
};

const accGen = (accs) => {
  let account = "100";
  const letters = "0123456789";
  const len = letters.length;

  for (let i = 0; i < 7; i++) {
    const rand = Math.floor(Math.random() * len);
    account += letters.slice(rand, rand + 1);
  }

  if (accs.includes(account)) {
    accGen(accs);
  }

  return account;
};

const cookieTokenGen = (uid) => {
  let id = uid + "-";
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const len = letters.length;

  for (let i = 1; i <= 24; i++) {
    const rand = Math.floor(Math.random() * len);
    id += letters.slice(rand, rand + 1);
    if (i % 4 === 0 && i < 24) {
      id += "-";
    }
  }

  return id;
};

const dateGen = (timestamp) => {
  const date = new Date(timestamp);

  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
};

module.exports = { idGen, cookieTokenGen, codeGen, accGen, dateGen };
