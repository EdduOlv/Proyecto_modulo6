const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const DBresp = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.json(DBresp);
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ msg: "Username does not exist" });
    }
    const payLoad = { user: { id: foundUser.id } };
    jwt.sign(
      payLoad,
      process.env.SECRET,
      { expiresIn: 3600 },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    res.json({
      msg: "We have an error",
      error,
    });
  }
};
// RECORDAR APLICAR user.findOne({}) para hacer la validacion
