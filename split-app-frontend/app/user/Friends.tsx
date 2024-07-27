"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import DFriendCard from "@/components/DFriendCard";
import DAddFriendDialog from "@/components/DAddFriendDialog";

const Friends = ({}) => {
  const [friends, setFriends] = useState([]);
  const [userId, setUserId] = useState("66a00f53054c36a84d8cb5a6");

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
    <div className="w-full h-full flex justify-center">
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
  );
};

export default Friends;
