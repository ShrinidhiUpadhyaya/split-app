import React from "react";
import Image from "next/image";
import Link from "next/link";
import DPrimaryButtonLink from "@/components/DPrimaryButtonLink";

const Header = () => {
  return (
    <div className="w-full flex justify-between px-16 py-4">
      <div className="flex-1">
        <Image src={"logo.svg"} height={24} width={96} alt="logo" />
      </div>
      <div className="w-full flex gap-8 items-center justify-end flex-1">
        <Link
          href="/login"
          className="primaryFontSize font-semibold cursor-pointer hover:underline"
        >
          Log In
        </Link>

        <DPrimaryButtonLink href="/signup" label="Sign Up" />
      </div>
    </div>
  );
};

export default Header;
