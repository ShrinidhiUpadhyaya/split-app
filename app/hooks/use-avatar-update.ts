import {useAuth} from "@clerk/nextjs";
import {Avatar} from "@prisma/client";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {redirect} from "next/navigation";
import {useState} from "react";

const useAvatarUpdate = () => {
  const [avatarValue, setAvatarValue] = useState<Avatar>(Avatar.AVATAR1);
  const {userId} = useAuth();

  const {mutate} = useMutation({
    mutationFn: (avatar: Avatar) => axios.put(`/api/user/${userId}`, {avatar: avatar}),
  });

  const handleAvatarUpdate = () => {
    mutate(avatarValue);
    redirect("/user");
  };

  return {avatarValue, setAvatarValue, handleAvatarUpdate};
};

export default useAvatarUpdate;
