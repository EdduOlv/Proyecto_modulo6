const express = require("express");
const auth = require("../middleware/authorization");
const { createUser } = require("../controllers/userController");

const userRouter = express.Router();

router.post("/register", createUser);

module.exports = userRouter;
