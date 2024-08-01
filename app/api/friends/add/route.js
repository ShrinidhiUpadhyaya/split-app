import {connectToDB} from "@/lib/mongo";
import Friend from "../../../models/Friend";
import User from "../../../models/User";
connectToDB();

export async function POST(req) {
  const {user_id, friendEmail} = await req.json();

  try {
    const user = await User.findOne({_id: user_id});
    const friend = await User.findOne({email: friendEmail});

    if (!user || !friend) {
      return new Response(
        JSON.stringify({
          error: "Both users must have an account on Splitwise",
        }),
        {status: 400},
      );
    }

    const newFriendship = new Friend({
      user_id: user._id,
      friend_id: friend._id,
    });

    const result = await newFriendship.save();
    return new Response(JSON.stringify(result), {status: 200});
  } catch (error) {
    console.error("Error", error);
    return new Response(JSON.stringify({error: error.message}), {
      status: 400,
    });
  }
}
