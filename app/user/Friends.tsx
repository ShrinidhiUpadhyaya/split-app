"use client";

import AddExpenseDialog from "@/components/screenComponents/AddExpenseDialog";
import AddFriendDialog from "@/components/screenComponents/AddFriendDialog";
import FriendCard from "@/components/screenComponents/FriendCard";
import {Button} from "@/components/ui/button";
import {fetchFriendsData} from "@/lib/expenseApi";
import {useAppStore} from "@/store/zustand";
import {useEffect} from "react";

const Friends = ({}) => {
  const {user, friends, setFriends} = useAppStore();

  useEffect(() => {
    async function fetchFriends() {
      try {
        const response = await fetchFriendsData(user?._id);
        if (response) setFriends(response);
      } catch (err) {
        console.log("Error fetching friends data", err);
      }
    }

    if (user?._id) fetchFriends();
  }, [user?._id]);

  return (
    <div className="h-full w-full space-y-8 px-8">
      <div className="flex justify-center">
        {friends.length < 1 ? (
          <div className="flex w-[50%] flex-col justify-center gap-8 text-center">
            <p className="mb-8 w-full text-4xl font-bold">You have not added any friends yet</p>

            <AddFriendDialog />
          </div>
        ) : (
          <div className="w-full space-y-8">
            <div className="flex w-full">
              <AddFriendDialog />

              <div className="flex flex-1 justify-end gap-4">
                <AddExpenseDialog />
                <Button variant="secondary">Settle Up</Button>
              </div>
            </div>

            <div className="flex h-full w-full gap-8">
              {friends.map((friend) => (
                <FriendCard key={friend?.email} friend={friend} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
