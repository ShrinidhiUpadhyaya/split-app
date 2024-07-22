const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
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
  }
);

module.exports = mongoose.model("User", userSchema);
