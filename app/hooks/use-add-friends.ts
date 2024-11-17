import {useMutation} from "@tanstack/react-query";
import axios from "axios";

const useAddFriends = () => {
  const {mutate, isPending, isError, isSuccess, error, data} = useMutation({
    mutationFn: (email: string) => axios.post("/api/friends/add", {email: email}),
  });

  const searchUser = (email: string) => {
    mutate(email);
  };

  return {searchUser, isPending, isError, isSuccess, error, data};
};

export default useAddFriends;
