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
import SignUpForm from "./SignUpForm";

const SignUp = () => {
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
    showErrorToast(error.toString());
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
              <p className="text-[#616061]"> Have a account?</p>
              <DTextLink label="Log In" href="/login" />
            </div>
          </div>

          <div className="w-[35%] space-y-12">
            <p className="mb-8 w-full text-center text-4xl font-bold">Create your Split account</p>

            <DGoogleButton
              label="Continue with Google"
              type="SIGNUP"
              className="w-full"
              onSuccess={handleSuccess}
              onError={handlError}
            />

            <DSeperator />

            <SignUpForm onSuccess={handleSuccess} onError={handlError} onLoading={setLoading} />
          </div>
        </DPage>
      </div>
    </>
  );
};

export default SignUp;
