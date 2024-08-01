"use client";

import DPage from "@/components/DPage";
import DPrimaryButtonLink from "@/components/DPrimaryButtonLink";
import DTextLink from "@/components/DTextLink";
import {Button} from "@/components/ui/button";
import Image from "next/image";

const WelcomeScreen = () => {
  return (
    <DPage>
      <div className="w-[35%] flex flex-col items-center">
        <Image src="/welcome.jpg" width={240} height={240} objectFit="contain" alt="Split Logo" />

        <p className="text-4xl font-bold mb-12 w-full text-center">Welcome to Split</p>

        <p className="text-xl font-bold mb-4 w-full text-center">What would you like do?</p>

        <div className="space-y-4 w-full">
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
