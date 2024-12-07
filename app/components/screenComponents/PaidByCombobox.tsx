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
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import React, {useCallback, useState} from "react";
import UserAvatar from "../DUserAvatar";

interface ComboboxProps {
  user: Object;
  friends: Array<Object>;
  onValueChange?: Function;
}
const PaidByCombobox: React.FC<ComboboxProps> = ({user, friends, onValueChange}) => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(user);

  const handleSelect = useCallback(
    (selected) => {
      if (selected.id !== selectedUser.id) {
        setSelectedUser(selected);
        setOpen(false);
        onValueChange?.(selected);
      }
    },
    [selectedUser, onValueChange],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedUser?.name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>Person not found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <UserAvatarCommandItem
                user={user}
                isSelected={selectedUser?.id === user?.id}
                onSelect={handleSelect}
              />

              {friends.map((friend) => (
                <UserAvatarCommandItem
                  key={friend.id}
                  user={friend}
                  isSelected={selectedUser?.id === friend?.id}
                  onSelect={handleSelect}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PaidByCombobox;

interface UserAvatarCommandItemProps {
  isSelected: boolean;
  user: Object;
  onSelect: (user) => void;
}
const UserAvatarCommandItem = ({isSelected, user, onSelect}: UserAvatarCommandItemProps) => (
  <CommandItem value={user.id} className="gap-2" onSelect={() => onSelect(user)}>
    <UserAvatar src={user.avatar} label={user.name} />
    <Check className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
  </CommandItem>
);

UserAvatarCommandItem.displayName = "UserAvatarCommandItem";
