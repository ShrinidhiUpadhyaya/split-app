"use client";

import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

import DPrimaryButtonLink from "@/components/DPrimaryButtonLink";

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
          <Link
            href="/login"
            className="primaryFontSize cursor-pointer font-semibold hover:underline"
          >
            Log In
          </Link>

          <DPrimaryButtonLink href="/signup" label="Sign Up" className="w-min" />
        </div>
      )}
    </div>
  );
};

export default Header;
