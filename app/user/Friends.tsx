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
    <div className="w-full h-full px-8 space-y-8">
      <div className="flex justify-center py-16">
        {friends.length < 1 ? (
          <div className="w-[50%] flex flex-col justify-center gap-8 text-center">
            <p className="text-4xl font-bold mb-8 w-full">You have not added any friends yet</p>

            <AddFriendDialog />
          </div>
        ) : (
          <div className="w-full space-y-8">
            <div className="w-full flex">
              <AddFriendDialog />

              <div className="flex-1 flex justify-end gap-4">
                <AddExpenseDialog />
                <Button variant="secondary">Settle Up</Button>
              </div>
            </div>

            <div className="w-full h-full">
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
