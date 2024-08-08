"use client";

import AddExpenseDialog from "@/components/screenComponents/AddExpenseDialog";
import AddFriendDialog from "@/components/screenComponents/AddFriendDialog";
import FriendCard from "@/components/screenComponents/FriendCard";
import {Button} from "@/components/ui/button";
import {useAppStore} from "@/store/zustand";
import axios from "axios";
import {useEffect} from "react";

const Friends = ({}) => {
  const {user, friends, setFriends} = useAppStore();

  useEffect(() => {
    async function fetchFriends() {
      try {
        const response = await axios.get(`/api/friends/${user._id}`);
        setFriends(response.data);
      } catch (error) {
        console.log("Fetch friends Error", error);
      }
    }

    fetchFriends();
  }, [user]);

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

            <div className="h-full w-full">
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
