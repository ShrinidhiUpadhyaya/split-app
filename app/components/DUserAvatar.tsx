import getAvatarType from "@/lib/get-avatar-type";
import {Avatar} from "@prisma/client";
import Image from "next/image";

interface UserAvatarProps {
  name: string;
  src: Avatar;
}

const UserAvatar = ({label, src}: UserAvatarProps) => {
  return (
    <div className="flex flex-1 items-center gap-2">
      <Image src={getAvatarType(src)} width={24} height={24} alt="Avatar" />
      {label}
    </div>
  );
};

export default UserAvatar;
