const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *       400:
 *         description: Error al registrar el usuario
 */

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ msg: "the mail already exists" });
    }
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
      return res.status(400).json({ msg: "The mail or password does not correspond" });
    }
    const correctPassword = await bcryptjs.compare(
      password,
      foundUser.password
    );
    if (!correctPassword) {
      return await res
        .status(400)
        .json({ msg: "The mail or password does not correspond" });
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

exports.verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    res.status(500).json({
      msg: "We have an error",
      error,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id, username, email, password } = req.body;
  try {
    const salt = await bcryptjs.genSalt(10);
    const updatePassword = await bcryptjs.hash(password, salt);
    const updateUser = await User.findByIdAndUpdate(id, { username, email,  password: updatePassword }, { new: true });
    res.json(updateUser);
  } catch (error) {
    res.status(500).json({
      msg: "There was an error updating the user",
      error,
    });
  }
};
