import {Avatar} from "@prisma/client";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useEffect, useState} from "react";

export interface FriendType {
  id: string;
  avatar: Avatar;
  name: string;
}

const useFetchFriends = () => {
  const [friends, setFriends] = useState<FriendType[]>([]);

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
