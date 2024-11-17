import AVATARS from "@/constants/avatars";
import {Avatar} from "@prisma/client";

const getAvatarType = (type: Avatar) => {
  const avatarType = AVATARS.find((avatar) => avatar.value === type);
  return avatarType?.src;
};

export default getAvatarType;
