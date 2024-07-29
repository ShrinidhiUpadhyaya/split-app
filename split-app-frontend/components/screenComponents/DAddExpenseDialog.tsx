"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import DPaidByCombobox from "./DPaidByCombobox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { DTable } from "./DTable";
import { useAppStore } from "@/store/zustand";

const shareOptions = [
  {
    label: "Equally",
    value: "equally",
  },

  {
    label: "Perctanges",
    value: "perctanges",
  },

  {
    label: "Shares",
    value: "shares",
  },

  {
    label: "Exact Amounts",
    value: "exact Amounts",
  },
];

import DTagPicker from "./DTagPicker";

const DAddExpenseDialog = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [persons, setPerson] = useState();
  const { friends } = useAppStore();
  const [expenseShared, setExpenseShared] = useState([]);

  useEffect(() => {
    const userWithAmount = friends.map((friend) => {
      return { ...friend, amount: null };
    });

    setPerson(userWithAmount);
  }, [friends]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="text-lg font-bold">Add Expense</Button>
      </DialogTrigger>
      <DialogContent className="!max-w-full w-3/4 h-3/4 block !space-y-0">
        <DialogHeader className="py-4">
          <DialogTitle className="text-2xl">Add an expense </DialogTitle>
        </DialogHeader>

        <div className="w-full flex gap-8 text-black">
          <div className="w-[40%] space-y-8 bg-[#CCF2FF] rounded-lg p-4">
            <div className="flex gap-4">
              <span className="min-w-[20%]">Title</span>
              <Input />
            </div>
            <div className="flex gap-4">
              <span className="min-w-[20%]">Paid by</span>
              <DPaidByCombobox people={persons} />
            </div>
            <div className="flex gap-4 items-center">
              <span className="min-w-[20%]">Amount</span>
              <div className="flex gap-2 items-center">
                <Select>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="number" />
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <span className="min-w-[20%]">Persons</span>
              <div className="w-[200px] h-20 flex-1 overflow-hidden">
                <DTagPicker onValueChange={setExpenseShared} people={persons} />
              </div>
            </div>
          </div>
          <div className="flex-1 bg-[#CCF2FF] rounded-lg p-4">
            <Tabs defaultValue="equally" className="w-full ">
              <TabsList className="grid w-full grid-cols-4">
                {shareOptions.map((option) => (
                  <TabsTrigger
                    key={option.value}
                    value={option.value}
                    className="w-full font-semibold gap-4 rounded-md data-[state=active]:bg-[#00BAF2] data-[state=active]:text-[white]"
                  >
                    <span className="hidden sm:flex">{option.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="equally">
                <div className="w-full h-72 max-h-72 rounded-lg overflow-hidden">
                  <DTable values={expenseShared} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <DialogFooter>
          <div className="w-full flex gap-8 justify-end pb-4 pt-12">
            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="w-40">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" className="w-40 font-bold">
                Add
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DAddExpenseDialog;
