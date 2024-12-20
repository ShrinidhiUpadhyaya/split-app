"use client";

import {Button} from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import useCreateUser from "@/hooks/use-create-user";
import {FriendType} from "@/hooks/use-fetch-friends";
import {cn} from "@/lib/utils";
import {Avatar} from "@prisma/client";
import {Check, ChevronsUpDown} from "lucide-react";
import React, {useEffect, useState} from "react";
import DUserAvatar from "../DUserAvatar";

interface ComboboxProps {
  friends: FriendType[];
  onValueChange?: Function;
}
const DPaidByCombobox: React.FC<ComboboxProps> = ({friends, onValueChange}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const {user} = useCreateUser();

  const userId = user?._id;

  useEffect(() => {
    onValueChange?.(value);
  }, [value, onValueChange]);

  useEffect(() => {
    setValue(userId);
  }, [userId, setValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {user && (
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {user.name}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>Person not found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {user && (
                <UserAvatarCommandItem
                  avatar={user.avatar}
                  label={user.name}
                  value={user.id}
                  checked={value === user.id}
                  onSelect={() => {
                    if (user.id !== value) {
                      setValue(user.id);
                      setOpen(false);
                    }
                  }}
                />
              )}

              {friends.map((friend) => (
                <UserAvatarCommandItem
                  avatar={friend.avatar}
                  label={friend.name}
                  key={friend.id}
                  value={friend.id}
                  checked={value === friend.id}
                  onSelect={() => {
                    if (friend.id !== value) {
                      setValue(friend.id);
                      setOpen(false);
                    }
                  }}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DPaidByCombobox;

interface UserAvatarCommandItemProps {
  checked: boolean;
  label: string;
  avatar: Avatar;
  value: string;
  onSelect: () => void;
}
const UserAvatarCommandItem = ({
  checked,
  label,
  avatar,
  value,
  onSelect,
}: UserAvatarCommandItemProps) => (
  <CommandItem value={value} className="gap-2" onSelect={onSelect}>
    <DUserAvatar avatar={avatar} label={label} />

    <Check className={cn("mr-2 h-4 w-4", checked ? "opacity-100" : "opacity-0")} />
  </CommandItem>
);

UserAvatarCommandItem.displayName = "UserAvatarCommandItem";
