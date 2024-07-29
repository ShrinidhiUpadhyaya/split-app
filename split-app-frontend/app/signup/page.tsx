"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/zustand";
import SignUpForm from "./SignUpForm";
import DSeperator from "@/components/DSeperator";
import DTextLink from "@/components/DTextLink";
import DGoogleButton from "@/components/DGoogleButton";
import DPage from "@/components/DPage";
import { signUp } from "@/utils/authApi";

const SignUp = () => {
  const router = useRouter();
  const { setUserID } = useAppStore();

  const sendSignUpReq = async (token: string | null | undefined) => {
    if (token) {
      const user = await signUp(token);
      if (user) {
        setUserID(user);
        router.push("/user");
      }
    }
  };

  return (
    <DPage>
      <div className="top-0 right-0 flex w-full">
        <div className="flex-1 flex justify-center items-end">
          <Link href="/">
            <Image src="/logo.svg" width={150} height={150} alt="Split Logo" />
          </Link>
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

        <DGoogleButton
          label="Continue with Google"
          className="w-full"
          onSignIn={sendSignUpReq}
        />

        <DSeperator />

        <SignUpForm onSignUp={sendSignUpReq} />
      </div>
    </DPage>
  );
};

export default SignUp;
