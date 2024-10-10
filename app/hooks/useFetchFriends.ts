import {useAppStore} from "@/store/zustand";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useEffect, useMemo} from "react";

const useFetchFriends = (userId) => {
  const {setFriends} = useAppStore();

  const {data: friendsData} = useQuery({
    queryKey: ["friends"],
    queryFn: () => axios.get(`/api/friends/${userId}`),
  });

  useEffect(() => {
    if (friendsData) setFriends(friendsData.data);
  }, [friendsData]);

  const {
    data: friendsExpensesData,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["friendsExpenses"],
    queryFn: () => axios.get(`/api/expense/friendsExpense/${userId}`),
    enabled: !!friendsData,
  });

  const friendTransactions = useMemo(() => {
    if (friendsData && friendsExpensesData) {
      return friendsData.data.map((friend) => ({
        ...friend,
        ...(friendsExpensesData.data[friend._id] || {}),
      }));
    }
    return [];
  }, [friendsExpensesData]);

  return {friendTransactions, isPending, isError, isSuccess};
};

export default useFetchFriends;
