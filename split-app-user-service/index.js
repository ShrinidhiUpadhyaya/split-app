require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const admin = require("firebase-admin");
require("./config/dbConnection");
const User = require("./model/userModel");
const Friend = require("./model/friendModel");

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

app.post("/add-Friend", async (req, res) => {
  const { userEmail, friendEmail } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });
    const friend = await User.findOne({ email: friendEmail });

    if (!user || !friend) {
      throw new Error("Both users must have an account on Splitwise");
    }

    const newFriendship = new Friend({
      user_id: user._id,
      friend_id: friend._id,
    });

    const result = await newFriendship.save();
    res.status(200).json(result);
  } catch (error) {
    console.log("Error");
    res.status(400).json({ error: error.message });
  }
});

app.get("/friends/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const friendships = await Friend.find({
      $or: [{ user_id: userId }, { friend_id: userId }],
    }).populate("user_id friend_id", "name email"); // Populate to get user details

    const friends = friendships.map((friendship) => {
      if (friendship.user_id._id.toString() === userId) {
        return {
          id: friendship.friend_id._id,
          email: friendship.friend_id.email,
        };
      } else {
        return { id: friendship.user_id, email: friendship.email };
      }
    });

    console.log("##");
    console.log(friendships);

    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
