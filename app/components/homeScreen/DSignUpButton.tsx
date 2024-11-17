"use client";

import {SignUpButton} from "@clerk/nextjs";
import {Button} from "../ui/button";

const DSignInButton = () => {
  return (
    <SignUpButton>
      <Button className="w-3/4 font-bold">Get Started</Button>
    </SignUpButton>
  );
};

export default DSignInButton;
