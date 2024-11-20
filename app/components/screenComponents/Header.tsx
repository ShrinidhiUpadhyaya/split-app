"use client";

import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

const headerRoutes = ["/"];

const Header = () => {
  const pathname = usePathname();
  const showHeader = headerRoutes.includes(pathname);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={cn("flex w-full justify-center", !showHeader && "hidden")}>
      <div className="w-3/4 py-4">
        <Link href="/">
          <Image src="logo.svg" height={24} width={96} alt="Split logo" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
