const { Router } = require("express");
const {
  checkSend,
  send,
  history,
} = require("../controllers/account.controller");
const { protected } = require("../middlewares/user.middleware");

const route = Router();
route.use(protected);

route.post("/account", checkSend);
route.post("/send", send);
route.get("/history", history);

module.exports = route;
