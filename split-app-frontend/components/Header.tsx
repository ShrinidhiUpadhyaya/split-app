"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import DPrimaryButtonLink from "@/components/DPrimaryButtonLink";
import { useAuthStore } from "@/store/zustand";

const Header = () => {
  const pathname = usePathname();
  const showHeader =
    pathname === "/login" || pathname === "/signup" ? false : true;
  const { user } = useAuthStore();

  return (
    <div
      className={cn(
        "w-full flex justify-between px-16 py-4",
        !showHeader && "hidden"
      )}
    >
      <div className="flex-1">
        <Link href="/">
          <Image src={"logo.svg"} height={24} width={96} alt="Split logo" />
        </Link>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          {user?.displayName}
          <Image
            src="/guy1Profile.png"
            height={24}
            width={24}
            alt="Profile Photo"
          />
        </div>
      ) : (
        <div className="w-full flex gap-8 items-center justify-end flex-1">
          <Link
            href="/login"
            className="primaryFontSize font-semibold cursor-pointer hover:underline"
          >
            Log In
          </Link>

          <DPrimaryButtonLink
            href="/signup"
            label="Sign Up"
            className="w-min"
          />
        </div>
      )}
    </div>
  );
};

export default Header;
