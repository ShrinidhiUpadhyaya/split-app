import Friend from "../../../models/Friend";

export async function GET(req, {params}) {
  const {userId} = params;

  try {
    const friendships = await Friend.find({
      $or: [{user_id: userId}, {friend_id: userId}],
    }).populate("user_id friend_id", "name email");

    const friends = friendships.map((friendship) => {
      if (friendship.user_id._id.toString() === userId) {
        return {
          _id: friendship.friend_id._id,
          email: friendship.friend_id.email,
          name: friendship.friend_id.name,
        };
      } else {
        return {
          _id: friendship.user_id._id,
          email: friendship.user_id.email,
          name: friendship.user_id.name,
        };
      }
    });

    return new Response(JSON.stringify(friends), {status: 200});
  } catch (error) {
    console.log("Get friends error", error);
    return new Response(JSON.stringify({error: error.message}), {
      status: 500,
    });
  }
}
