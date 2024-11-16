"use client";

import DAvatar from "@/components/DAvatar";
import {Button} from "@/components/ui/button";
import AVATARS from "@/constants/avatars";
import {updateAvatar} from "@/lib/update-avatar";
import {cn} from "@/lib/utils";
import {Avatar} from "@prisma/client";
import {useRouter} from "next/navigation";
import {useState} from "react";

const AvatarSelect = () => {
  const [avatarValue, setAvatarValue] = useState<Avatar>(Avatar.AVATAR1);
  const router = useRouter();

  const handleAvatarUpdate = async () => {
    await updateAvatar(avatarValue);
    router.push("/user");
  };

  return (
    <div className={cn("space-y-16")}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
        {AVATARS.map((avatar) => (
          <DAvatar
            src={avatar.src}
            key={avatar.value}
            selected={avatarValue === avatar.value}
            onClick={() => setAvatarValue(avatar.value)}
          />
        ))}
      </div>
      <div className="flex w-full justify-center">
        <Button
          className="w-3/4 font-bold"
          onClick={() => {
            handleAvatarUpdate();
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default AvatarSelect;
