const { Router } = require("express");
const { register, login, logout } = require("../controllers/user.controller");
const { protected } = require("../middlewares/user.middleware");

const route = Router();

route.post("/register", register);
route.post("/login", login);

route.delete("/logout", protected, logout);

module.exports = route;
