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
import {useAppStore} from "@/store/zustand";
import {Check, ChevronsUpDown} from "lucide-react";
import React, {useEffect, useState} from "react";

interface ComboboxProps {
  persons: Array<Object>;
  onValueChange?: Function;
}

const DPaidByCombobox: React.FC<ComboboxProps> = ({persons, onValueChange}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const {user} = useAppStore();
  const userId = user._id;

  useEffect(() => {
    console.log("Value Change", value);
    onValueChange?.(value);
  }, [value]);

  useEffect(() => {
    console.log("Printing user id", userId);
    setValue(userId);
  }, [userId]);

  return (
    <div className="flex w-full items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value == userId
              ? "You"
              : (persons.find((person) => person?._id === value)?.name ??
                persons.find((person) => person?._id === value)?.email)}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>Person not found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {persons.map((person) => (
                  <CommandItem
                    key={person?._id}
                    value={person?._id}
                    onSelect={(currentValue) => {
                      console.log(currentValue);
                      if (currentValue !== value) {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === person?._id ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {person?.name ? person.name : person.email}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DPaidByCombobox;
