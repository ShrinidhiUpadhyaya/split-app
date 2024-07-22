"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";

import { Button } from "../../components/ui/button";
import DFormFieldComponent from "../../components/DFormFieldComponent";

const formSchema = z.object({
  email: z.string().min(6).max(25).email(),
  password: z.string().min(10).max(20),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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

        <Button type="submit" className="w-full text-lg font-bold">
          Sign in with your email
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
