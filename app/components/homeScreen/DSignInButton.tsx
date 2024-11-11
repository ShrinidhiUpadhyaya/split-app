"use client";

import {useClerk} from "@clerk/nextjs";
import {Button} from "../ui/button";

const DSignInButton = () => {
  const clerk = useClerk();

  return (
    <Button className="w-3/4 font-bold" onClick={() => clerk.openSignUp()}>
      Get Started
    </Button>
  );
};

export default DSignInButton;
