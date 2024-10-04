import {fetchFriendsData} from "@/lib/expenseApi";
import {useAppStore} from "@/store/zustand";
import {useEffect} from "react";

const useFetchFriends = (user) => {
  const {friends, setFriends} = useAppStore();

  useEffect(() => {
    async function fetchFriends() {
      try {
        const response = await fetchFriendsData(user?._id);
        if (!response) throw Error;
        setFriends(response);
      } catch (err) {
        console.log("Error fetching friends data", err);
      }
    }

    fetchFriends();
  }, [user]);

  return friends;
};

export default useFetchFriends;
