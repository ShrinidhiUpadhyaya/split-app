import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  friend_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

const Friend = mongoose.models.Friend || mongoose.model("Friend", friendSchema);

export default Friend;
