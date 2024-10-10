import {connectToDB} from "@/lib/mongo";
connectToDB();

import mongoose from "mongoose";
import Expense from "../../../../models/Expense";

export async function GET(req, {params}) {
  const {userId} = params;

  console.log("User Id", params);

  try {
    const transformedExpenses = await Expense.aggregate([
      {
        $match: {
          "sharedWith._id": mongoose.Types.ObjectId.createFromHexString(userId),
        },
      },
      {
        $unwind: "$sharedWith",
      },
      {
        $group: {
          _id: {
            description: "$description",
            paidBy: "$paidBy",
            totalAmount: "$amount",
            date: "$date",
          },
          sharedWith: {$push: "$sharedWith"},
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.paidBy",
          foreignField: "_id",
          as: "paidByDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "sharedWith._id",
          foreignField: "_id",
          as: "sharedWithDetails",
        },
      },
      {
        $project: {
          _id: 0,
          description: "$_id.description",
          paidBy: {
            $cond: [
              {$gt: [{$size: "$paidByDetails"}, 0]},
              {
                $let: {
                  vars: {
                    paidByDetail: {$arrayElemAt: ["$paidByDetails", 0]},
                  },
                  in: {
                    name: {$ifNull: ["$$paidByDetail.name", null]},
                    email: {$ifNull: ["$$paidByDetail.email", null]},
                    picture: {$ifNull: ["$$paidByDetail.picture", null]},
                  },
                },
              },
              null,
            ],
          },
          totalAmount: "$_id.totalAmount",
          date: "$_id.date",
          sharedWith: {
            $map: {
              input: {
                $filter: {
                  input: "$sharedWithDetails",
                  as: "sw",
                  cond: {$ne: ["$$sw._id", mongoose.Types.ObjectId.createFromHexString(userId)]},
                },
              },
              as: "user",
              in: {
                email: "$$user.email",
                name: "$$user.name",
                picture: "$$user.picture",
              },
            },
          },
          yourAmount: {
            $cond: {
              if: {$eq: ["$_id.paidBy", mongoose.Types.ObjectId.createFromHexString(userId)]},
              then: {
                $sum: {
                  $map: {
                    input: {
                      $filter: {
                        input: "$sharedWith",
                        as: "sw",
                        cond: {
                          $ne: ["$$sw._id", mongoose.Types.ObjectId.createFromHexString(userId)],
                        },
                      },
                    },
                    as: "other",
                    in: "$$other.amount",
                  },
                },
              },
              else: {
                $let: {
                  vars: {
                    userAmount: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$sharedWith",
                            as: "sw",
                            cond: {
                              $eq: [
                                "$$sw._id",
                                mongoose.Types.ObjectId.createFromHexString(userId),
                              ],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                  in: {$ifNull: ["$$userAmount.amount", 0]},
                },
              },
            },
          },
          isOwed: {
            $eq: ["$_id.paidBy", mongoose.Types.ObjectId.createFromHexString(userId)],
          },
        },
      },
      {
        $sort: {date: -1},
      },
    ]);

    return new Response(JSON.stringify(transformedExpenses), {status: 200});
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return new Response(JSON.stringify({error: error.message}), {
      status: 400,
    });
  }
}
