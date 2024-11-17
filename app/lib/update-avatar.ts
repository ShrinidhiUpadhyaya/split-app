"use server";

import {auth} from "@clerk/nextjs/server";
import {Avatar} from "@prisma/client";
import prisma from "../lib/db";

export const updateAvatar = async (avatar: Avatar) => {
  const {userId} = await auth();
  if (!userId) return -1;

  await prisma.user.update({
    where: {
      userId: userId,
    },
    data: {
      avatar: avatar,
    },
  });
};
