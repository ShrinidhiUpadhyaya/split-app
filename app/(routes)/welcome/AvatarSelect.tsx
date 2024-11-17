"use client";

import DAvatar from "@/components/DAvatar";
import {Button} from "@/components/ui/button";
import AVATARS from "@/constants/avatars";
import useAvatarUpdate from "@/hooks/use-avatar-update";
import {cn} from "@/lib/utils";

const AvatarSelect = () => {
  const {avatarValue, setAvatarValue, handleAvatarUpdate} = useAvatarUpdate();

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
