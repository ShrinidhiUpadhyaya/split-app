"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useAppStore } from "@/store/zustand";
import LoginForm from "./LoginForm";
import DSeperator from "@/components/DSeperator";
import DTextLink from "@/components/DTextLink";
import DGoogleButton from "@/components/DGoogleButton";
import DPage from "@/components/DPage";

const Login = () => {
  const router = useRouter();
  const { setUserID } = useAppStore();

  const login = async (token) => {
    try {
      const response = await axios.post(`http://localhost:3001/auth/login/`, {
        token: token,
      });
      const user = response.data;
      setUserID(user);
      router.push("/user");
    } catch (error) {
      console.log("Error", error);
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
          <p className="text-[#616061]"> New to Split?</p>
          <DTextLink label="Create Account" href="/signup" />
        </div>
      </div>

      <div className="w-[35%] space-y-12">
        <p className="text-4xl font-bold mb-8 w-full text-center">
          Sign in to your account
        </p>

        <DGoogleButton
          label="Continue with Google"
          className="w-full"
          onDone={login}
        />

        <DSeperator />

        <LoginForm onDone={login} />
      </div>
    </DPage>
  );
};

export default Login;
