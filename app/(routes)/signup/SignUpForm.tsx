"use client";

import DFormFieldComponent from "@/components/DFormFieldComponent";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import {signUp} from "@/lib/api/authApi";
import {createUserWithEmail} from "@/lib/firebase/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import React from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

interface SignUpFormProps {
  onLoading?: (loading: boolean) => void;
  onSuccess?: (user: Object) => void;
  onError?: (error: Error) => void;
}

const formSchema = z
  .object({
    email: z.string().min(6).max(25).email(),
    password: z.string().min(10).max(20),
    repeatPassword: z.string().min(10).max(20),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });

const SignUpForm: React.FC<SignUpFormProps> = ({onLoading, onSuccess, onError}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useMutation({
    mutationFn: async (values) => {
      const createValues = {email: values.email, password: values.password};
      const user = await createUserWithEmail(createValues);

      if (!user) {
        throw new Error("User Already Exists");
      }

      const token = await user.getIdToken();
      const userData = await signUp(token);

      if (!userData) {
        throw new Error("Signup failed");
      }

      return userData;
    },

    onSuccess: (data) => {
      if (data) onSuccess?.(data);
    },

    onError: (error) => {
      onError?.(error);
    },

    onMutate: () => {
      onLoading?.(true);
    },

    onSettled: () => {
      onLoading?.(false);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
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

        <DFormFieldComponent
          control={form.control}
          name="repeatPassword"
          placeholder="Re-enter password"
          type="password"
        />

        <Button type="submit" className="w-full font-bold">
          Sign in with your email
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
