import {splitAmount} from "@/lib/splitAmount";
import {SplitPerson} from "@/types/utils/splitTypes";
import User from "@/types/utils/user";
import {ChevronsUpDown} from "lucide-react";
import {useEffect, useState} from "react";
import DAvatarChip from "../DAvatarChip";
import DUserAvatar from "../DUserAvatar";
import DUserAvatarCommandItem from "../DUserAvatarCommandItem";
import {Button} from "../ui/button";
import {Card, CardContent, CardDescription, CardTitle} from "../ui/card";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandList} from "../ui/command";
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

const SplitDetailsCard = ({user, friends, paidBy, amount, type}: SplitDetailsCardProps) => {
  const [peopleInvolved, setPeopleInvolved] = useState<User[]>([]);
  const [open, setOpen] = useState(false);

  const [splitValues, setSplitValues] = useState<SplitPerson[]>([]);

  const isUserInvolved = (id: string) => {
    return splitValues.some((user) => user.id == id);
  };

  useEffect(() => {
    if (peopleInvolved.length > 0 && paidBy && amount && type) {
      const contributions = splitAmount(amount, peopleInvolved, type);
      setSplitValues(contributions);
    }
  }, [peopleInvolved, paidBy, amount, type]);

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col space-y-8 p-4">
        <div className="space-y-2">
          <div>
            <CardTitle className="text-sm sm:text-lg lg:text-xl">People Involved</CardTitle>
            <CardDescription className="hidden sm:block">
              Select the people involved and define how the expense is shared.
            </CardDescription>
          </div>
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
                      key={person.id}
                      label={person.name}
                      avatar={person.avatar}
                      className="hover:border hover:border-[#00BAF2]"
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
                      <DUserAvatarCommandItem
                        key={user.id}
                        value={user.id}
                        label={user.name}
                        avatar={user.avatar}
                        checked={isUserInvolved(user.id)}
                        onSelect={() => {
                          if (!isUserInvolved(user.id))
                            setPeopleInvolved((prev) => [...prev, user]);
                        }}
                      />
                    )}

                    {friends?.map((friend) => (
                      <DUserAvatarCommandItem
                        key={friend.id}
                        value={friend.id}
                        label={friend.name}
                        avatar={friend.avatar}
                        checked={isUserInvolved(friend.id)}
                        onSelect={() => {
                          if (!isUserInvolved(friend.id))
                            setPeopleInvolved((prev) => [...prev, friend]);
                        }}
                      />
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Separator />

        <div className="space-y-2">
          <div>
            <CardTitle className="text-sm sm:text-lg lg:text-xl">Split Details</CardTitle>
            <CardDescription className="hidden sm:block">
              Share of each person based on the selected split type.
            </CardDescription>
          </div>

          <div className="mt-4 space-y-4">
            {splitValues?.map((person) => (
              <div className="flex gap-16" key={person.id}>
                <DUserAvatar key={person.name} label={person.name} avatar={person.avatar} />
                <Input disabled value={person.amount} className="max-w-48 flex-1" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SplitDetailsCard;
