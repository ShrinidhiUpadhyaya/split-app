import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useFriendRequests = () => {
  const {data, isPending, isError, isSuccess} = useQuery({
    queryKey: ["friend-requests"],
    queryFn: () => axios.get(`/api/friends/requests/`),
  });

  return {data, isPending, isError, isSuccess};
};

export default useFriendRequests;
