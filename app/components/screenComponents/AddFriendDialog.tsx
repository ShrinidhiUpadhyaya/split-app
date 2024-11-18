import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import DFormFieldComponent from "@/components/DFormFieldComponent";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import useAddFriends from "@/hooks/use-add-friends";
import {cn} from "@/lib/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserPlus} from "lucide-react";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import DIconTextButton from "../DIconTextButton";
import DLoadingSpinner from "../DLoadingSpinner";
import useShowToast from "../DToast";
import {Separator} from "../ui/separator";

const formSchema = z.object({
  email: z.string().min(6).max(50).email(),
});

const AddFriendDialog = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {searchUser, isError, error, isSuccess, isPending} = useAddFriends();
  const {showErrorToast, showSuccessToast} = useShowToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    searchUser(values?.email);
  };

  useEffect(() => {
    if (isError) showErrorToast(error?.response?.data.error);
  }, [isError]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DIconTextButton
          label="Add Friends"
          icon={<UserPlus />}
          variant="outline"
          className="w-full"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-4 text-2xl">Add friends </DialogTitle>
        </DialogHeader>

        <DLoadingSpinner loading={isPending} />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-4", isPending && "pointer-events-none opacity-40")}
          >
            <DFormFieldComponent
              control={form.control}
              name="email"
              placeholder="Enter friend email"
            />

            <div>
              <Separator className="mb-4 mt-8" />

              <div className="w-full space-y-4">
                <Button type="submit" className="w-full">
                  Add
                </Button>

                <DialogClose asChild>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDialog;
