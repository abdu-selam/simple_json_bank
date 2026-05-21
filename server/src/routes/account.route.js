const { Router } = require("express");
const { checkSend, send } = require("../controllers/account.controller");
const { protected } = require("../middlewares/user.middleware");

const route = Router();
route.use(protected);

route.post("/account", checkSend);
route.post("/send", send);

module.exports = route;
