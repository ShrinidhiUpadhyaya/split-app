"use server";

import {Avatar} from "@prisma/client";
import {useMutation} from "@tanstack/react-query";

export const updateAvatar = async (avatar: Avatar) => {
  const {mutate, isPending, isError, isSuccess} = useMutation({
    mutationFn: (newPost) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
      }).then((res) => res.json()),
  });

  return {mutate, isPending, isError, isSuccess};
};
