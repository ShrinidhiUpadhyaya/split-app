import React from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input";

import DSocialLoginButton from "@/components/DSocialLoginButton";
import DSeperator from "@/components/DSeperator";
import DTextLink from "@/components/DTextLink";
import DPrimaryButtonLink from "@/components/DPrimaryButtonLink";

const loginOptions = [
  {
    type: "Sign up with Google",
    icon: "/google.png",
  },
  {
    type: "Sign up with Apple",
    icon: "/apple.png",
  },
];

const SignUp = () => {
  return (
    <div className="w-full h-svh flex flex-col justify-center items-center relative gap-8">
      <div className="top-0 right-0 flex justify- w-full">
        <div className="flex-1 flex justify-center items-end">
          <Image src="/logo.svg" width={150} height={150} alt="Split Logo" />
        </div>

        <div className="flex flex-col absolute right-0 py-2 px-8 text-sm">
          <p className="text-[#616061]"> Have a account?</p>
          <DTextLink label="Log In" href="/login" />
        </div>
      </div>

      <div className="w-[35%] space-y-12">
        <p className="text-4xl font-bold mb-8 w-full text-center">
          Create your Split account
        </p>
        <div className="w-full space-y-4">
          {loginOptions.map((option) => (
            <DSocialLoginButton
              key={option.type}
              icon={option.icon}
              label={option.type}
              className="w-full"
            />
          ))}
        </div>

        <DSeperator />

        <div className="space-y-4">
          <Input placeholder="your name" />
          <Input placeholder="youremail@email.com" />
          <Input placeholder="your password" />
          <Input placeholder="Re-enter your password" />
          <DPrimaryButtonLink label="Sign in with your email" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
