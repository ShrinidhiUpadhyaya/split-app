"use client";

import DGoogleButton from "@/components/DGoogleButton";
import DPage from "@/components/DPage";
import DSeperator from "@/components/DSeperator";
import DTextLink from "@/components/DTextLink";
import useShowToast from "@/components/DToast";
import {login} from "@/lib/authApi";
import {useAppStore} from "@/store/zustand";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import LoginForm from "./LoginForm";

const Login = () => {
  const router = useRouter();
  const {setUserID} = useAppStore();
  const {showErrorToast, showSuccessToast} = useShowToast();

  const sendSignInReq = async (user: Object | null | undefined) => {
    try {
      const userData = await login(user?.uid);
      setUserID(userData);
      router.push("/user");
      showSuccessToast("Login successful! Welcome back.");
      return;
    } catch (error) {
      showErrorToast(
        "We couldn't find a user with that email address or the password you entered is incorrect. Please check your email and password and try again.",
      );
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
        <p className="text-4xl font-bold mb-8 w-full text-center">Sign in to your account</p>

        <DGoogleButton label="Continue with Google" className="w-full" onSignIn={sendSignInReq} />

        <DSeperator />

        <LoginForm onSignIn={sendSignInReq} />
      </div>
    </DPage>
  );
};

export default Login;
