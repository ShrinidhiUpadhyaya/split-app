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
import {cn} from "@/lib/utils";
import {Avatar} from "@prisma/client";
import {Check, ChevronsUpDown} from "lucide-react";
import React, {useState} from "react";
import UserAvatar from "../DUserAvatar";
interface ComboboxProps {
  friends: Array<Object>;
  onValueChange?: Function;
}
const DPaidByCombobox: React.FC<ComboboxProps> = ({friends}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const {user} = useCreateUser();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value}
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
                src={user?.avatar}
                label={user?.name}
                value={user?.id}
                checked={value === user.name}
                onSelect={() => {
                  if (user.name !== value) {
                    setValue(user.name);
                    setOpen(false);
                  }
                }}
              />

              {friends.map((friend) => (
                <UserAvatarCommandItem
                  src={friend.request?.avatar}
                  label={friend.request.name}
                  key={friend?.id}
                  value={friend?.id}
                  checked={value === friend.request.name}
                  onSelect={() => {
                    if (friend.request.name !== value) {
                      setValue(friend.request.name);
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
  src: Avatar;
  value: string;
  onSelect: () => void;
}
const UserAvatarCommandItem = ({
  checked,
  label,
  src,
  value,
  onSelect,
}: UserAvatarCommandItemProps) => (
  <CommandItem value={value} className="gap-2" onSelect={onSelect}>
    <UserAvatar src={src} label={label} />

    <Check className={cn("mr-2 h-4 w-4", checked ? "opacity-100" : "opacity-0")} />
  </CommandItem>
);

UserAvatarCommandItem.displayName = "UserAvatarCommandItem";
