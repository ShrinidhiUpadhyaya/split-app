import mongoose from "mongoose";
import Expense from "../../../models/Expense";
import Friend from "../../../models/Friend";

export async function GET(req, {params}) {
  const {userId} = params;

  try {
    const friends = await getFriends(userId);
    const ObjectId = mongoose.Types.ObjectId;
    const expenses = await Expense.aggregate([
      {
        $match: {
          $or: [
            {paidBy: new ObjectId(userId)},
            {paidBy: {$in: friends}},
            {"sharedWith._id": new ObjectId(userId)},
            {"sharedWith._id": {$in: friends}},
          ],
        },
      },
    ]);

    let result = {};

    friends.forEach((friendId) => {
      result[friendId] = {
        owes: 0,
        owedBy: 0,
        transactions: [],
      };
    });

    expenses.forEach((expense) => {
      if (expense.paidBy.equals(userId)) {
        expense.sharedWith.forEach((share) => {
          if (friends.some((friend) => friend.equals(share._id))) {
            result[share._id] = result[share._id] || {owes: 0, owedBy: 0, transactions: []};
            result[share._id].owes += share.amount;
            result[share._id].transactions.push({
              description: expense.description,
              amount: share.amount,
              type: "owes",
              date: expense.date,
            });
          }
        });
      } else if (friends.some((friend) => friend.equals(expense.paidBy))) {
        expense.sharedWith.forEach((share) => {
          if (share._id.equals(userId)) {
            result[expense.paidBy] = result[expense.paidBy] || {
              owes: 0,
              owedBy: 0,
              transactions: [],
            };
            result[expense.paidBy].owedBy += share.amount;
            result[expense.paidBy].transactions.push({
              description: expense.description,
              amount: share.amount,
              type: "owedBy",
              date: expense.date,
            });
          }
        });
      }
    });

    for (const friendId in result) {
      result[friendId].transactions = result[friendId].transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 2);
    }

    for (const friendId in result) {
      const owesValue = result[friendId].owes;
      const owedByValue = result[friendId].owedBy;
      const finalValue = owesValue - owedByValue;

      if (finalValue < 0) {
        // friend owes
        result[friendId].owedBy = Math.abs(finalValue);
        result[friendId].owes = 0;
      } else {
        // friend owedBy
        result[friendId].owes = finalValue;
        result[friendId].owedBy = 0;
      }
    }

    return new Response(JSON.stringify(result), {status: 200});
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return new Response(JSON.stringify({error: error.message}), {
      status: 400,
    });
  }
}

async function getFriends(userId) {
  try {
    const friendships = await Friend.find({
      $or: [{user_id: userId}, {friend_id: userId}],
    }).populate("user_id friend_id", "name email");

    const friends = friendships.map((friendship) => {
      if (friendship.user_id._id.toString() === userId) {
        return friendship.friend_id._id;
      } else {
        return friendship.user_id._id;
      }
    });

    return friends;
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw error;
  }
}
