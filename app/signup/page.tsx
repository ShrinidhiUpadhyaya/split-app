"use client";

import DGoogleButton from "@/components/DGoogleButton";
import DPage from "@/components/DPage";
import DSeperator from "@/components/DSeperator";
import DTextLink from "@/components/DTextLink";
import {signUp} from "@/lib/authApi";
import {useAppStore} from "@/store/zustand";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  const router = useRouter();
  const {setUserID} = useAppStore();

  const sendSignUpReq = async (user: string | null | undefined) => {
    if (user) {
      const token = await user.getIdToken();
      const userData = await signUp(token);
      if (userData) {
        setUserID(userData);
        router.push("/user");
      }
    }
  };

  return (
    <DPage>
      <div className="right-0 top-0 flex w-full">
        <div className="flex flex-1 items-end justify-center">
          <Link href="/">
            <Image src="/logo.svg" width={150} height={150} alt="Split Logo" />
          </Link>
        </div>

        <div className="absolute right-0 flex flex-col px-8 py-2 text-sm">
          <p className="text-[#616061]"> Have a account?</p>
          <DTextLink href="/login">Log In</DTextLink>
        </div>
      </div>

      <div className="w-[35%] space-y-12">
        <p className="mb-8 w-full text-center text-4xl font-bold">Create your Split account</p>

        <DGoogleButton label="Continue with Google" className="w-full" onSignIn={sendSignUpReq} />

        <DSeperator />

        <SignUpForm onSignUp={sendSignUpReq} />
      </div>
    </DPage>
  );
};

export default SignUp;
