"use client";

import {SignUpButton} from "@clerk/nextjs";
import {Button} from "../ui/button";

const DSignUpButton = () => {
  return (
    <SignUpButton>
      <Button className="w-3/4">Get Started</Button>
    </SignUpButton>
  );
};

export default DSignUpButton;
