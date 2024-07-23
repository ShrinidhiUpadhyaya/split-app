"use client";

import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { signInWithGoogle } from "../firebase/utils";

interface ButtonProps {
  label?: string;
  className?: string;
}

const signUpWithGoogle = async () => {
  try {
    const idToken = await signInWithGoogle();

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
        className={cn("text-lg font-semibold", className)}
        variant="outline"
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
