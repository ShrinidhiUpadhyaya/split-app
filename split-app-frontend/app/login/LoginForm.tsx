"use client";

import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppStore } from "@/store/zustand";
import { Form } from "@/components/ui/form";
import { Button } from "../../components/ui/button";
import { signInWithGoogle, useAuthStateUser } from "@/firebase/utils";
import DFormFieldComponent from "../../components/DFormFieldComponent";

const formSchema = z.object({
  email: z.string().min(6).max(25).email(),
  password: z.string().min(10).max(20),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signInWithGoogle();
  };

  const authStateUser = useAuthStateUser();
  const { setUser } = useAppStore();

  useEffect(() => {
    setUser(authStateUser);
  }, [authStateUser, setUser]);

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

        <Button type="submit" className="w-full text-lg font-bold">
          Sign in with your email
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
