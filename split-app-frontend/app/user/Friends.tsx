"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import DFriendCard from "@/components/DFriendCard";
import DAddFriendDialog from "@/components/DAddFriendDialog";
import { Button } from "@/components/ui/button";
import DAddExpenseDialog from "@/components/DAddExpenseDialog";
import { useAppStore } from "@/store/zustand";

const Friends = ({}) => {
  const { friends, setFriends } = useAppStore();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/friends/${userId}`
        );

        setFriends(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchFriends();
  }, [userId]);

  useEffect(() => {
    console.log("Printing friends");
    console.log(friends);
  }, [friends]);

  return (
    <div className="w-full h-full px-8 space-y-8">
      <div className="w-full flex">
        <Button>Add friend</Button>

        <div className="flex-1 flex justify-end gap-4">
          <DAddExpenseDialog />
          <Button>Settle Up</Button>
        </div>
      </div>
      <div className="border border-[black]">
        {friends ? (
          <div className="w-full h-full">
            {friends.map((friend) => (
              <DFriendCard key={friend?.email} friend={friend} />
            ))}
          </div>
        ) : (
          <div className="w-[50%] flex flex-col justify-center gap-8">
            <p className="text-4xl font-bold mb-8 w-full text-center">
              You have not added any friends yet
            </p>

            <DAddFriendDialog />
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
