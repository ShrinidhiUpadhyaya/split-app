"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagPickerProps {
  people: Array<Object>;
  onValueChange: ([]) => void;
}

const DTagPicker: React.FC<TagPickerProps> = ({ people, onValueChange }) => {
  const [selectedValues, setSelectedValues] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [persons, setPersons] = useState(people);

  useEffect(() => {
    onValueChange(selectedValues);
  }, [selectedValues, onValueChange]);

  useEffect(() => {
    setPersons(people);
  }, [people]);

  return (
    <div className="w-full border border-[blue]">
      <div className="h-full flex pr-4 bg-[red] overflow-hidden w-full">
        {selectedValues.map((value) => (
          <Badge key={value}>{value}</Badge>
        ))}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-start"
          >
            Select People
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  key={"you"}
                  value={"you"}
                  onSelect={(currentValue) => {
                    if (!selectedValues.includes(currentValue)) {
                      const tempVal = [...selectedValues, currentValue];
                      setSelectedValues(tempVal);
                    } else {
                      const tempVal = selectedValues.filter(
                        (value) => value !== currentValue
                      );
                      setSelectedValues(tempVal);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes("you")
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  You
                </CommandItem>
                {persons.map((person) => (
                  <CommandItem
                    key={person.id}
                    value={person.id}
                    onSelect={(currentValue) => {
                      if (!selectedValues.includes(currentValue)) {
                        const tempVal = [...selectedValues, currentValue];
                        setSelectedValues(tempVal);
                      } else {
                        const tempVal = selectedValues.filter(
                          (value) => value !== currentValue
                        );
                        setSelectedValues(tempVal);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues.includes(person.id)
                          ? "opacity-100"
                          : "opacity-0"
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

export default DTagPicker;
