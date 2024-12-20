"use client";

import {Button} from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import useCreateUser from "@/hooks/use-create-user";
import {FriendType} from "@/hooks/use-fetch-friends";
import {ChevronsUpDown} from "lucide-react";
import React, {useEffect, useState} from "react";
import DUserAvatarCommandItem from "../DUserAvatarCommandItem";

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
                <DUserAvatarCommandItem
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
                <DUserAvatarCommandItem
                  value={friend.id}
                  avatar={friend.avatar}
                  label={friend.name}
                  key={friend.id}
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
