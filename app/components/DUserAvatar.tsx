import getAvatarType from "@/lib/get-avatar-type";
import {Avatar} from "@prisma/client";
import Image from "next/image";

interface DUserAvatarProps {
  label: string;
  src: Avatar;
}

const DUserAvatar = ({label, src}: DUserAvatarProps) => {
  const avatarType = getAvatarType(src);
  return (
    <div className="flex flex-1 items-center gap-2">
      {avatarType ? (
        <Image src={avatarType} width={24} height={24} alt="Avatar" />
      ) : (
        <div className="h-6 w-6 rounded-full bg-[white] text-black"> {label} </div>
      )}
      {label}
    </div>
  );
};

export default DUserAvatar;
