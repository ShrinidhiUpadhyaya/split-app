"use client";

import {login, signUp} from "@/lib/api/authApi";
import {signInWithGoogle} from "@/lib/firebase/utils";
import {cn} from "@/lib/utils";
import Image from "next/image";
import React from "react";
import {Button} from "./ui/button";

interface ButtonProps {
  label?: string;
  type: "LOGIN" | "SIGNUP";
  className?: string;
  onSuccess?: (user: Object) => void;
  onError?: (error: Error) => void;
}

const DGoogleButton: React.FC<ButtonProps> = ({
  label = "Label",
  type,
  className,
  onSuccess,
  onError,
}) => {
  const onSubmit = async () => {
    try {
      const response = await signInWithGoogle();
      if (!response) throw new Error("Google sign-in failed");

      if (type === "LOGIN") {
        const user = await login(response.user?.uid);
        if (!user) throw new Error("Login failed");
        onSuccess?.(user);
        return;
      }

      const token = await response.user?.getIdToken();
      const user = await signUp(token);
      if (!user) throw new Error("SignUp failed");

      onSuccess?.(user);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  return (
    <div>
      <Button className={cn("font-semibold", className)} variant="outline" onClick={onSubmit}>
        <div className="flex h-full w-full items-center justify-center gap-4">
          <Image src={"/google.png"} height={24} width={24} alt={label} />
          {label}
        </div>
      </Button>
    </div>
  );
};

export default DGoogleButton;
