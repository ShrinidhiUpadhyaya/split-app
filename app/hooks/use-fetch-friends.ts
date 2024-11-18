import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useEffect, useState} from "react";

const useFetchFriends = () => {
  const [friends, setFriends] = useState([]);

  const {data} = useQuery({
    queryKey: ["friends"],
    queryFn: () => axios.get(`/api/friends/`),
  });

  useEffect(() => {
    if (data) setFriends(data.data);
  }, [data]);

  return {friends};
};

export default useFetchFriends;
