"use client";

import DGoogleButton from "@/components/DGoogleButton";
import DLoadingSpinner from "@/components/DLoadingSpinner";
import DPage from "@/components/DPage";
import DSeperator from "@/components/DSeperator";
import DTextLink from "@/components/DTextLink";
import useShowToast from "@/components/DToast";
import {useAppStore} from "@/store/zustand";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  const router = useRouter();
  const {setUserID} = useAppStore();
  const {showErrorToast, showSuccessToast} = useShowToast();
  const [loading, setLoading] = useState(false);

  const handleSuccess = (userData: Object) => {
    setUserID(userData);
    router.push("/user");
    showSuccessToast("Login successful! Welcome back.");
  };

  const handlError = (error: Error) => {
    console.log("Error", error);
    showErrorToast(
      "We couldn't find a user with that email address or the password you entered is incorrect. Please check your email and password and try again.",
    );
  };

  return (
    <>
      <DLoadingSpinner loading={loading} />
      <div className={clsx(loading && "pointer-events-none opacity-40")}>
        <DPage>
          <div className="right-0 top-0 flex w-full">
            <div className="flex flex-1 items-end justify-center">
              <Link href="/">
                <Image src="/logo.svg" width={150} height={150} alt="Split Logo" />
              </Link>
            </div>

            <div className="absolute right-0 flex flex-col px-8 py-2 text-sm">
              <p className="text-[#616061]"> New to Split?</p>
              <DTextLink label="Create Account" href="/signup" />
            </div>
          </div>

          <div className="w-[35%] space-y-12">
            <p className="mb-8 w-full text-center text-4xl font-bold">Sign in to your account</p>

            <DGoogleButton
              label="Continue with Google"
              type="LOGIN"
              className="w-full"
              onSuccess={handleSuccess}
              onError={handlError}
            />

            <DSeperator />

            <LoginForm onSuccess={handleSuccess} onError={handlError} onLoading={setLoading} />
          </div>
        </DPage>
      </div>
    </>
  );
};

export default Login;
