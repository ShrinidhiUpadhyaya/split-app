const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: {type: Date, default: Date.now},
  paidBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  sharedWith: [
    {
      _id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
      shareType: {
        type: String,
        enum: ["equal", "percentage", "shares", "exact"],
        default: "equal",
      },
      amount: {type: Number, default: 0},
      percentage: {type: Number, default: 0},
      shares: {type: Number, default: 0},
    },
  ],
});

const Expense = mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export default Expense;
