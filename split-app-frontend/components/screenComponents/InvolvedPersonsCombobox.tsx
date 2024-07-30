"use client";

import React, { useState, useEffect } from "react";
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

interface ComboboxProps {
  people: Array<Object>;
  className?: string;
  onValueChange: ([]) => void;
}

const InvolvedPersonsCombobox: React.FC<ComboboxProps> = ({
  people,
  onValueChange,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [open, setOpen] = useState(false);
  const [persons, setPersons] = useState(people);

  useEffect(() => {
    console.log("Hello world");
    onValueChange(selectedValues);
  }, [selectedValues]);

  useEffect(() => {
    setPersons(people);
  }, [people]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-start"
        >
          {selectedValues ? selectedValues.length : "Select People"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Command>
          <CommandInput placeholder="Search person..." />
          <CommandEmpty>Person not found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {persons.map((person) => (
                <CommandItem
                  key={person.id}
                  value={person.id}
                  onSelect={(currentValue) => {
                    console.log(
                      "Check if valu exists",
                      selectedValues.includes(person)
                    );
                    if (!selectedValues.includes(person)) {
                      const tempVal = [...selectedValues, person];
                      setSelectedValues(tempVal);
                    } else {
                      const tempVal = selectedValues.filter(
                        (value) => value !== person
                      );
                      setSelectedValues(tempVal);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(person)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {person?.name ?? person.email}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default InvolvedPersonsCombobox;
