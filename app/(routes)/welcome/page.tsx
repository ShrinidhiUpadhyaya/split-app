"use client";

import DPage from "@/_components/DPage";
import DPrimaryButtonLink from "@/_components/DPrimaryButtonLink";
import DTextLink from "@/_components/DTextLink";
import {Button} from "@/_components/ui/button";
import Image from "next/image";

const WelcomeScreen = () => {
  return (
    <DPage>
      <div className="flex w-[35%] flex-col items-center">
        <Image src="/welcome.jpg" width={240} height={240} objectFit="contain" alt="Split Logo" />

        <p className="mb-12 w-full text-center text-4xl font-bold">Welcome to Split</p>

        <p className="mb-4 w-full text-center text-xl font-bold">What would you like do?</p>

        <div className="w-full space-y-4">
          <DPrimaryButtonLink href="/signup" label="Create Group" className="w-full" />

          <Button variant="outline" className="w-full font-semibold">
            Invite friends
          </Button>

          <DTextLink href="/login" label="Skip for now" />
        </div>
      </div>
    </DPage>
  );
};

export default WelcomeScreen;
