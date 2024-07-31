"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppStore } from "@/store/zustand";

import PaidByCombobox from "./PaidByCombobox";
import ExpenseTable from "./ExpenseTable";

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

const FormSchema = z.object({
  description: z.string({
    required_error: "Please enter a description.",
  }),
  paidBy: z.string({
    required_error: "Please select who paid the expense.",
  }),
  amount: z.coerce.number().gte(0).default(0),
});

const AddExpenseDialog = () => {
  const { friends, user } = useAppStore();
  const [persons, setPerson] = useState([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [formValues, setFormValues] = useState();
  const [backendData, setBackendData] = useState([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const userWithAmount = friends.map((friend) => {
      return { ...friend, amount: 0 };
    });

    const updatedValue = [
      ...userWithAmount,
      { _id: user?._id, amount: 0, name: "You", email: user?.email },
    ];

    setPerson(updatedValue);
  }, [friends]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setFormValues(values);
  };

  const compueBackendValues = useCallback(() => {
    const checkNullAmount = backendData.filter((value) => value.amount != 0);
    const newValues = checkNullAmount?.map((value) => ({ _id: value._id }));

    const backendSchema = {
      description: formValues?.description,
      amount: totalAmount,
      date: Date.now,
      paidBy: formValues?.paidBy,
      sharedWith: [{ ...newValues }],
    };

    console.log("Backend Schema Data", backendSchema);
  }, [formValues]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add Expense</Button>
      </DialogTrigger>
      <DialogContent className="!max-w-full w-3/4 h-11/12 block !space-y-0">
        <DialogHeader className="py-4">
          <DialogTitle className="text-2xl">Add an expense</DialogTitle>
        </DialogHeader>
        <div className="w-full lg:flex gap-8">
          <div className="lg:w-[40%] flex-1 space-y-8 rounded-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex-1 w-full space-y-6"
                id="addExpenseForm"
              >
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-8">
                        <FormLabel className="min-w-[20%] max-w-[20%]">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paidBy"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-8">
                        <FormLabel className="min-w-[20%] max-w-[20%]">
                          Paid by
                        </FormLabel>
                        <FormControl>
                          <PaidByCombobox
                            persons={persons}
                            onValueChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-8">
                        <FormLabel className="min-w-[20%] max-w-[20%]">
                          Amount
                        </FormLabel>
                        <div className="flex gap-4">
                          <Select defaultValue="rupees">
                            <SelectTrigger className="w-24">
                              <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rupees">₹</SelectItem>
                              <SelectItem value="euro">€</SelectItem>
                              <SelectItem value="dollar">$</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(event) => {
                                setTotalAmount(event.target.value);
                              }}
                              className="font-bold text-xl"
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          <div className="flex-1 rounded-lg p-4">
            <Tabs defaultValue="equally" className="w-full ">
              <TabsList className="grid w-full grid-cols-4">
                {shareOptions.map((option) => (
                  <TabsTrigger
                    key={option.value}
                    value={option.value}
                    className="w-full gap-4 rounded-md"
                  >
                    <span className="hidden sm:flex">{option.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="equally">
                <div className="w-full h-72 max-h-72 rounded-lg overflow-hidden">
                  <ExpenseTable
                    tableData={persons}
                    totalAmount={totalAmount}
                    onValueChange={setBackendData}
                  />
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

              <Button
                type="submit"
                form="addExpenseForm"
                className="w-40 font-bold"
              >
                Add
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseDialog;