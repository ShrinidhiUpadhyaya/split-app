import React from "react";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

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

        <Link href="" className={buttonVariants({ variant: "default" })}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Header;
