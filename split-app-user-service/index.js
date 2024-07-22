require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const admin = require("firebase-admin");
require("./config/dbConnection");
const User = require("./model/userModel");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

app.post("/signup", async (req, res) => {
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

    res.status(200).send({ name: savedUser.name, email: savedUser.email });
  } catch (error) {
    res.status(500).send({ error: "Error signing up user" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
