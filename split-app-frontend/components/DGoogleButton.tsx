"use client";

import React from "react";
import Image from "next/image";

import { auth } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

interface ButtonProps {
  label?: string;
  className?: string;
}

const signUpWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    const response = await fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to sign up user");
    }
  } catch (error) {
    console.error(error);
  }
};

const DGoogleButton: React.FC<ButtonProps> = ({
  label = "Label",
  className,
}) => {
  return (
    <div>
      <Button
        className={cn(
          "border-2 border-[#5E5D6073] bg-transparent text-black hover:bg-transparent hover:shadow-lg flex gap-4 text-lg font-semibold h-11 rounded-xl",
          className
        )}
        onClick={signUpWithGoogle}
      >
        <div className="w-full h-full flex items-center justify-center gap-4">
          <Image src={"/google.png"} height={24} width={24} alt={label} />
          {label}
        </div>
      </Button>
    </div>
  );
};

export default DGoogleButton;
