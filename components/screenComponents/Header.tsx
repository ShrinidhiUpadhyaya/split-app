"use client";

import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

import DPrimaryButtonLink from "@/components/DPrimaryButtonLink";
import DTextLink from "../DTextLink";

const headerRoutes = ["/"];

const Header = () => {
  const pathname = usePathname();
  const showHeader = headerRoutes.includes(pathname);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={cn("flex h-16 w-full justify-between px-16 py-4", !showHeader && "hidden")}>
      <div className="flex-1">
        <Link href="/">
          <Image src={"logo.svg"} height={24} width={96} alt="Split logo" />
        </Link>
      </div>

      {isMounted && (
        <div className="flex w-full flex-1 items-center justify-end gap-8">
          <DTextLink href="/login" className="text-base">
            Log In
          </DTextLink>

          <DPrimaryButtonLink href="/signup" className="w-min">
            Sign Up
          </DPrimaryButtonLink>
        </div>
      )}
    </div>
  );
};

export default Header;
