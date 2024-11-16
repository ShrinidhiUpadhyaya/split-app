"use client";

import {SignUpButton} from "@clerk/nextjs";
import {Button} from "../ui/button";

const DSignUpButton = () => {
  return (
    <SignUpButton>
      <Button className="primary-color-text w-3/4 border-2 font-bold" variant="outline">
        I already have an account
      </Button>
    </SignUpButton>
  );
};

export default DSignUpButton;
