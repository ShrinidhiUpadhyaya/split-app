"use client";

import React from "react";

import { useRouter } from "next/navigation";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { signInWithGoogle } from "../firebase/utils";

interface ButtonProps {
  label?: string;
  className?: string;
  onDone?: Function;
}

const DGoogleButton: React.FC<ButtonProps> = ({
  label = "Label",
  className,
  onDone = () => {},
}) => {
  const router = useRouter();

  const onSubmit = async () => {
    const idToken = await signInWithGoogle();
    onDone(idToken);
  };

  return (
    <div>
      <Button
        className={cn("text-lg font-semibold", className)}
        variant="outline"
        onClick={onSubmit}
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
