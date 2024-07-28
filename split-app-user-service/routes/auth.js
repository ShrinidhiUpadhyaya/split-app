const express = require("express");
const admin = require("../firebase/config");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    const existingUser = await User.findOne({ uid });

    if (!existingUser) {
      return res.status(409).send({ error: "User does not exists" });
    }

    const jwtToken = jwt.sign({ uid }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("session", jwtToken, { httpOnly: true, secure: true });
    res.status(200).send("Login successful");
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
});

router.post("/signup", async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;
    const existingUser = await User.findOne({ uid });

    if (existingUser) {
      return res.status(409).send({ error: "User exists" });
    }

    const newUser = new User({ uid, email, name, picture });
    const savedUser = await newUser.save();
    const jwtToken = jwt.sign({ uid }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("session", jwtToken, { httpOnly: true, secure: true });
    res.status(200).send({ name: savedUser.name, email: savedUser.email });
  } catch (error) {
    res.status(500).send({ error: "Error signing up user" });
  }
});

module.exports = router;
