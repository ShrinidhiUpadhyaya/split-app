import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: [true, "Please add uid"],
    },
    email: {
      type: String,
      requiure: [true, "Please add user email"],
    },
    name: {
      type: String,
      requiure: [true, "Please add user name"],
    },
    picture: {
      type: String,
      requiure: [true, "Please add user picture"],
    },
  },
  {
    timestamps: true,
  },
);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
