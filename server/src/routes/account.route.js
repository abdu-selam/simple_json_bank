const { Router } = require("express");
const { checkSend } = require("../controllers/account.controller");
const { protected } = require("../middlewares/user.middleware");

const route = Router();
route.use(protected);

route.post("/account", checkSend);

module.exports = route;
