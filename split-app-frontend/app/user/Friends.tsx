"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import DFriendCard from "@/components/screenComponents/DFriendCard";
import DAddFriendDialog from "@/components/screenComponents/DAddFriendDialog";
import DAddExpenseDialog from "@/components/screenComponents/DAddExpenseDialog";
import { useAppStore } from "@/store/zustand";

const Friends = ({}) => {
  const { user, friends, setFriends } = useAppStore();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/friends/${user._id}`
        );
        setFriends(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchFriends();
  }, [user, setFriends]);

  return (
    <div className="w-full h-full px-8 space-y-8">
      <div className="flex justify-center py-16">
        {friends.length < 1 ? (
          <div className="w-[50%] flex flex-col justify-center gap-8 text-center">
            <p className="text-4xl font-bold mb-8 w-full">
              You have not added any friends yet
            </p>

            <DAddFriendDialog />
          </div>
        ) : (
          <>
            <div className="w-full flex">
              <Button>Add friend</Button>

              <div className="flex-1 flex justify-end gap-4">
                <DAddExpenseDialog />
                <Button variant="secondary">Settle Up</Button>
              </div>
            </div>

            <div className="w-full h-full">
              {friends.map((friend) => (
                <DFriendCard key={friend?.email} friend={friend} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Friends;
