"use client";

import React from "react";
import Image from "next/image";

import DSeperator from "@/components/DSeperator";
import DTextLink from "@/components/DTextLink";
import LoginForm from "./LoginForm";

import DGoogleButton from "@/components/DGoogleButton";

const Login = () => {
  return (
    <div className="w-full h-svh flex flex-col items-center relative gap-8 pt-8">
      <div className="top-0 right-0 flex w-full">
        <div className="flex-1 flex justify-center items-end">
          <Image src="/logo.svg" width={150} height={150} alt="Split Logo" />
        </div>

        <div className="flex flex-col absolute right-0 py-2 px-8 text-sm">
          <p className="text-[#616061]"> New to Split?</p>
          <DTextLink label="Create Account" href="/signup" />
        </div>
      </div>

      <div className="w-[35%] space-y-12">
        <p className="text-4xl font-bold mb-8 w-full text-center">
          Sign in to your account
        </p>

        <DGoogleButton label="Continue with Google" className="w-full" />

        <DSeperator />

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
