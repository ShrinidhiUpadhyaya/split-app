import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import {useAppStore} from "@/store/zustand";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import DFormFieldComponent from "../DFormFieldComponent";

const formSchema = z.object({
  email: z.string().min(6).max(50).email(),
});

const AddFriendDialog = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {user} = useAppStore();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/add-friend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?._id,
          friendEmail: values?.email,
        }),
      });
      console.log(response.status);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add friends</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl py-4">Add friends </DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <DFormFieldComponent
                  control={form.control}
                  name="email"
                  placeholder="friendemail@email.com"
                />

                <div className="w-full flex justify-end pb-4 pt-12">
                  <div className="w-1/2 flex gap-4">
                    <DialogClose asChild>
                      <Button type="button" variant="outline" className="w-full font-bold">
                        Cancel
                      </Button>
                    </DialogClose>

                    <Button type="submit" className="w-full font-bold">
                      Add
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDialog;
