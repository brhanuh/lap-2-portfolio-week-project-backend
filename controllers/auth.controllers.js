const User = require("../models/users.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Need to create findByEmail function!!!

async function registration(req, res) {
  try {
    console.log(req.body);
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(req.body.passsword, salt);

    await User.create({ ...req.body, password: hashed });
    console.log(hashed);
    res.status(201).json({ msg: "User Created" });
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function login(req, res) {
  try {
    const user = await User.findByEmail(req.body.email);
    if (!user) {
      throw new Error("User with this email not found");
    }

    const authed = bcrypt.compare(req.body.user_password, user.user_password);
    console.log("user", user);
    console.log("authed", authed);

    if (!!authed) {
      const payload = { username: user.username, email: user.email };
      const sendToken = (err, token) => {
        if (err) {
          throw new Error("Error in token generation");
        }
        console.log(token, token);
        res.status(200).json({
          success: true,
          token: token,
        });
      };
      jwt.sign(payload, process.env.SECRET, { expiresIn: 60 }, sendToken);
    } else {
      throw new Error("User could not be authenticated");
    }
  } catch (error) {
    res.status(401).json({ err: err.message });
  }
}

module.exports = { registration, login };
