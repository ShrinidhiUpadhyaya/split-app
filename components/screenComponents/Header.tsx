"use client";

import DPrimaryButtonLink from "@/components/DPrimaryButtonLink";
import useShowToast from "@/components/DToast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {logOut} from "@/lib/authApi";
import {cn} from "@/lib/utils";
import {useAppStore} from "@/store/zustand";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const authRoutes = ["/login", "/signup"];

const Header = () => {
  const pathname = usePathname();
  const showHeader = !authRoutes.includes(pathname);
  const {user, clearAll} = useAppStore();
  const router = useRouter();
  const {showSuccessToast} = useShowToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onLogOut = async () => {
    try {
      await logOut();
      clearAll();
      router.push("/");
      showSuccessToast("You have successfully logged out.");
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  return (
    <div className={cn("flex w-full justify-between px-16 py-4", !showHeader && "hidden")}>
      <div className="flex-1">
        <Link href="/">
          <Image src={"logo.svg"} height={24} width={96} alt="Split logo" />
        </Link>
      </div>

      {isMounted && (
        <>
          {user ? (
            <div className="flex items-center gap-4">
              <p>{user.name ?? user.email}</p>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Image src="/guy1Profile.png" height={24} width={24} alt="Profile Photo" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 shadow-lg" align="end">
                  <DropdownMenuItem className="cursor-pointer">Your Account</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={onLogOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
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
        </>
      )}
    </div>
  );
};

export default Header;
