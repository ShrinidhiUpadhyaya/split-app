"use client";

import {signInWithGoogle} from "@/lib/firebase/utils";
import {cn} from "@/lib/utils";
import Image from "next/image";
import React from "react";
import {Button} from "./ui/button";

interface ButtonProps {
  label?: string;
  className?: string;
  onSignIn?: Function;
}

const DGoogleButton: React.FC<ButtonProps> = ({label = "Label", className, onSignIn}) => {
  const onSubmit = async () => {
    const user = await signInWithGoogle();
    onSignIn?.(user);
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
