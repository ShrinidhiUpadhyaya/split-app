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
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {format} from "date-fns";
import {CalendarIcon, Plus} from "lucide-react";
import {useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import DIconTextButton from "../DIconTextButton";
import {Input} from "../ui/input";
import PaidByCombobox from "./PaidByCombobox";
import SplitDetailsCard from "./SplitDetailsCard";
// import SplitTypeSelect from "./SplitTypeSelect";
import useCreateUser from "@/hooks/use-create-user";
import useFetchFriends from "@/hooks/use-fetch-friends";
import User from "@/types/utils/user";
const SPLIT_TYPES = ["Equal", "Percentage", "ExactAmounts"] as const;

const FORM_SCHEMA = z.object({
  description: z.string({
    required_error: "Please enter a description.",
  }),
  paidBy: z.custom<User>(),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  type: z.enum(SPLIT_TYPES).default("Equal"),
});

const AddExpenseDialog = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const {friends} = useFetchFriends();
  const {user} = useCreateUser();

  const form = useForm<z.infer<typeof FORM_SCHEMA>>({
    resolver: zodResolver(FORM_SCHEMA),
  });

  useEffect(() => {
    if (user) {
      form.reset({...form.getValues(), paidBy: user});
    }
  }, [user, form]);

  const {paidBy, amount} = form.getValues();

  const onSubmit = (values: z.infer<typeof FORM_SCHEMA>) => {
    console.log("Values", values);
    // setFormValues(values);
    // computeBackendValues();
  };

  const formFields = useMemo(
    () => [
      {
        name: "description" as const,
        label: "Description",
        component: Input,
      },
      {
        name: "paidBy" as const,
        label: "Paid by",
        component: PaidByCombobox,
        props: {user, friends},
      },
      {
        name: "amount" as const,
        label: "Amount",
        component: Input,
        props: {type: "number", className: "text-xl font-bold"},
      },
      // {
      //   name: "type" as const,
      //   label: "Split Type",
      //   component: SplitTypeSelect,
      // },
    ],
    [user, friends],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DIconTextButton label="Add Expense" icon={<Plus />} variant="outline" />
      </DialogTrigger>
      <DialogContent className="flex h-[95%] w-3/4 !max-w-full flex-col !space-y-0 md:h-5/6">
        <DialogHeader className="py-4 pb-8">
          <DialogTitle className="text-2xl">Add an expense</DialogTitle>
        </DialogHeader>
        <div className="w-full flex-1 space-y-8 lg:flex lg:gap-24 lg:space-y-0">
          <div className="w-full rounded-lg lg:min-w-[360px] lg:max-w-[360px] lg:space-y-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="block w-full items-center justify-center gap-8 gap-x-8 space-y-6 md:grid md:grid-cols-2 md:space-y-0 lg:block lg:space-y-6"
                id="addExpenseForm"
              >
                {formFields.map(({name, label, component: Component, props = {}}) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({field}) => (
                      <FormItem>
                        <div className="flex items-center gap-2 md:gap-8">
                          <FormLabel className="min-w-[20%] max-w-[20%] overflow-hidden text-ellipsis">
                            {label}
                          </FormLabel>
                          <FormControl>
                            <Component {...field} {...props} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </form>
            </Form>
          </div>

          <div className="w-full flex-1 rounded-lg">
            <SplitDetailsCard
              user={user}
              friends={friends}
              amount={amount}
              type="Equal"
              paidBy={paidBy}
            />
          </div>
        </div>

        <DialogFooter>
          <div className="w-full space-y-8 pb-4 pt-12 sm:flex sm:gap-8 sm:space-y-0">
            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start overflow-hidden text-ellipsis px-2 text-left font-normal sm:w-36 md:w-[280px]",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 hidden h-4 w-4 md:block" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(day: Date | undefined) => setDate(day)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-4 sm:flex sm:gap-4 sm:space-y-0">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="w-full sm:w-24 lg:w-40">
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                form="addExpenseForm"
                className="w-full font-bold sm:w-24 lg:w-40"
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
