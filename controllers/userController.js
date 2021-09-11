const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const createToken = (user) => {
  return jwt.sign({ user }, process.env.SECRETKEY, {
    expiresIn: "7d",
  });
};
require("dotenv").config();
module.exports.registerValidation = [
  body("name").not().isEmpty().trim().withMessage("Name cannot be empty"),
  body("email").not().isEmpty().trim().withMessage("Email cannot be empty"),
  body("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must be of minimum 6 characters"),
];
module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const checkUser = await User.findOne({
      email,
    });
    if (checkUser) {
      return res.status(400).json({ errors: [{ msg: "Email Already Taken" }] });
    }

    // hasing the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    try {
      const user = await User.create({
        name,
        email,
        password: hash,
      });
      const token = createToken(user);
      return res.status(200).json({
        message: "Your account has been created",
        token,
      });
    } catch (error) {}
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports.loginValidation = [
  body("email").not().isEmpty().trim().withMessage("Email cannot be empty"),
  body("password").not().isEmpty().withMessage("Password required"),
];

module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const matchPass = await bcrypt.compare(password, user.password);
      if (matchPass) {
        const token = createToken(user);
        return res
          .status(200)
          .json({ message: "Authorization successfull", token });
      } else {
        return res
          .status(401)
          .json({ errors: [{ message: "Wrong Password" }] });
      }
    } else {
      return res.status(404).json({ errors: [{ message: "Email not found" }] });
    }
  } catch (error) {
    return res.status(500).json({
      errors: errors,
    });
  }
};
