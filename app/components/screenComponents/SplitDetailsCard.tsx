import {cn} from "@/lib/utils";
import User from "@/types/utils/user";
import {Avatar} from "@prisma/client";
import {Check, ChevronsUpDown} from "lucide-react";
import {useEffect, useState} from "react";
import DAvatarChip from "../DAvatarChip";
import DUserAvatar from "../DUserAvatar";
import {Button} from "../ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {Input} from "../ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import {Separator} from "../ui/separator";
type ExpenseType = "Equal" | "ExactAmounts" | "Percentages";

interface SplitDetailsCardProps {
  paidBy: Object;
  amount: number;
  type: ExpenseType;
  user: User;
  friends: Array<any>;
}

interface Person {
  id: string;
  name: string;
  avatar: Avatar;
  contribution: string;
}

const SplitDetailsCard = ({user, friends, paidBy, amount, type}: SplitDetailsCardProps) => {
  const [peopleInvolved, setPeopleInvolved] = useState<User[]>([]);
  const [open, setOpen] = useState(false);

  const [splitValues, setSplitValues] = useState<Person[]>([]);

  const isUserInvolved = (id: string) => {
    return splitValues.some((user) => user.id == id);
  };

  useEffect(() => {
    if (peopleInvolved.length > 0 && paidBy && amount && type) {
      // const contributions = calculateContributions(amount, peopleInvolved, type);
      // setSplitValues(contributions);
    }
  }, [peopleInvolved, paidBy, amount, type]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">People Involved</CardTitle>
        <CardDescription>
          Select the people involved and define how the expense is shared.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-8">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="group w-full justify-between px-1"
            >
              <div className="flex gap-1">
                {peopleInvolved.slice(0, 3).map((person) => (
                  <DAvatarChip
                    key={person.name}
                    label={person.name}
                    src={person.avatar}
                    // className="group-hover:border group-hover:border-[#00BAF2]"
                  />
                ))}
              </div>

              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {user && (
                    <CommandItem
                      key={user.id}
                      value={user.id}
                      onSelect={() => {
                        if (!isUserInvolved(user.id)) setPeopleInvolved((prev) => [...prev, user]);
                      }}
                    >
                      {user.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          isUserInvolved(user.id) ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  )}

                  {friends?.map((friend) => (
                    <CommandItem
                      key={friend.id}
                      value={friend.id}
                      onSelect={() => {
                        if (!isUserInvolved(friend?.id))
                          setPeopleInvolved((prev) => [...prev, friend]);
                      }}
                    >
                      {friend.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          isUserInvolved(friend?.id) ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Separator />

        <div>
          <CardTitle className="text-xl">Split Details</CardTitle>
          <CardDescription>Share of each person based on the selected split type.</CardDescription>
          {splitValues?.map((person) => (
            <div className="flex gap-16" key={person.id}>
              <DUserAvatar key={person.name} label={person.name} src={person.avatar} />
              <Input disabled value={person.contribution} className="max-w-48 flex-1" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SplitDetailsCard;
