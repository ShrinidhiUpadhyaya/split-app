"use client";

import {useClerk} from "@clerk/nextjs";
import {Button} from "../ui/button";

const DSignUpButton = () => {
  const clerk = useClerk();

  return (
    <Button
      className="primary-color-text w-3/4 border-2 font-bold"
      variant="outline"
      onClick={() => clerk.openSignIn()}
    >
      I already have an account
    </Button>
  );
};

export default DSignUpButton;
