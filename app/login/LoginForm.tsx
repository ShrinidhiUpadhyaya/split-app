"use client";

import {Form} from "@/components/ui/form";
import {manualSignIn} from "@/firebase/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import DFormFieldComponent from "../../components/DFormFieldComponent";
import {Button} from "../../components/ui/button";

interface LoginFormProps {
  onSignIn?: (user: Object | null | undefined) => void;
}

const formSchema = z.object({
  email: z.string().min(6).max(25).email(),
  password: z.string().min(10).max(20),
});

const LoginForm: React.FC<LoginFormProps> = ({onSignIn}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const user = await manualSignIn(values);
    onSignIn?.(user);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <DFormFieldComponent
          control={form.control}
          name="email"
          placeholder="youremail@email.com"
        />

        <DFormFieldComponent
          control={form.control}
          name="password"
          placeholder="your password"
          type="password"
        />

        <Button type="submit" className="w-full font-bold">
          Sign in with your email
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
