const express = require("express");
const auth = require("../middleware/authorization");
const { createUser, login } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", login);

module.exports = userRouter;
