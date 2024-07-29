require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const cookies = require("cookie-parser");
require("./config/dbConnection");
const User = require("./model/userModel");
const Friend = require("./model/friendModel");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cookies());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use("/auth", authRoutes);

app.post("/add-Friend", async (req, res) => {
  const { user_id, friendEmail } = req.body;

  try {
    const user = await User.findOne({ _id: user_id });
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
    console.log("Error", error);
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
          name: friendship.friend_id.name,
        };
      } else {
        return {
          id: friendship.user_id,
          email: friendship.email,
          name: friendship.name,
        };
      }
    });

    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
