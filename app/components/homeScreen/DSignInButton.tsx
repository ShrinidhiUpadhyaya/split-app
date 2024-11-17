"use client";

import {SignInButton} from "@clerk/nextjs";
import {Button} from "../ui/button";

const DSignInButton = () => {
  return (
    <SignInButton>
      <Button className="w-3/4" variant="outline">
        I already have an account
      </Button>
    </SignInButton>
  );
};

export default DSignInButton;
