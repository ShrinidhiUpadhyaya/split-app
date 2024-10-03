"use client";

import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {cn} from "@/lib/utils";
import {useAppStore} from "@/store/zustand";
import {zodResolver} from "@hookform/resolvers/zod";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {addExpense} from "@/lib/expenseApi";
import ExpenseTable from "./ExpenseTable";
import PaidByCombobox from "./PaidByCombobox";

const shareOptions = [
  {
    label: "Equally",
    value: "equal",
  },

  {
    label: "Percentages",
    value: "percentage",
  },
  {
    label: "Exact Amounts",
    value: "exact",
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
  const {friends, user} = useAppStore();
  const [persons, setPerson] = useState([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [formValues, setFormValues] = useState();
  const [backendData, setBackendData] = useState([]);
  const [currentType, setCurrentType] = useState("equal");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const userWithAmount = friends.map((friend) => {
      return {
        _id: friend._id,
        email: friend.email,
        name: friend.name,
        amount: 0,
        percentage: 0,
      };
    });

    const updatedValue = [
      ...userWithAmount,
      {_id: user?._id, amount: 0, name: "You", email: user?.email, percentage: 0},
    ];

    setPerson(updatedValue);
  }, [friends]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setFormValues(values);
    computeBackendValues();
  };

  const computeBackendValues = async () => {
    const checkNullAmount = backendData.filter((value) => value.amount != 0);
    const newValues = checkNullAmount?.map((value) => ({
      _id: value._id,
      shareType: currentType,
      percentage: value?.percentage,
      amount: value?.amount,
      name: value?.name,
      email: value?.email,
    }));

    const apiSchemaValues = {
      description: formValues?.description,
      amount: totalAmount,
      date: Date.now,
      paidBy: formValues?.paidBy,
      sharedWith: newValues,
    };

    const response = await addExpense(apiSchemaValues);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add Expense</Button>
      </DialogTrigger>
      <DialogContent className="h-11/12 block w-3/4 !max-w-full !space-y-0">
        <DialogHeader className="py-4">
          <DialogTitle className="text-2xl">Add an expense</DialogTitle>
        </DialogHeader>
        <div className="w-full gap-8 lg:flex">
          <div className="w-full space-y-8 rounded-lg border border-[red] lg:min-w-[320px] lg:max-w-[320px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full flex-1 grid-cols-2 items-center justify-center gap-x-8 space-y-6 lg:block"
                id="addExpenseForm"
              >
                <FormField
                  control={form.control}
                  name="description"
                  render={({field}) => (
                    <FormItem>
                      <div className="flex items-center gap-8">
                        <FormLabel className="min-w-[20%] max-w-[20%]">Description</FormLabel>
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
                  render={({field}) => (
                    <FormItem>
                      <div className="flex items-center gap-8">
                        <FormLabel className="min-w-[20%] max-w-[20%]">Paid by</FormLabel>
                        <FormControl>
                          <PaidByCombobox persons={persons} onValueChange={field.onChange} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({field}) => (
                    <FormItem>
                      <div className="flex items-center gap-8">
                        <FormLabel className="min-w-[20%] max-w-[20%]">Amount</FormLabel>
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
                              className="text-xl font-bold"
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

          <div className="w-full flex-1 rounded-lg border border-[red]">
            <Tabs defaultValue="equal" className="w-full" onValueChange={setCurrentType}>
              <TabsList className="grid w-full grid-cols-3">
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
              {shareOptions.map((option) => (
                <TabsContent key={option.value} value={option.value}>
                  <div className="h-72 max-h-72 w-full overflow-hidden rounded-lg">
                    <ExpenseTable
                      tableData={persons}
                      totalAmount={totalAmount}
                      onValueChange={(data) => {
                        setBackendData(data);
                      }}
                      type={option.value}
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        <DialogFooter>
          <div className="flex w-full justify-end gap-8 pb-4 pt-12">
            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="w-40">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" form="addExpenseForm" className="w-40 font-bold">
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
