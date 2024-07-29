"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/zustand";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DPrimaryButtonLink from "@/components/DPrimaryButtonLink";
import useShowToast from "@/components/DToast";
import { logOut } from "@/utils/authApi";

const authRoutes = ["/login", "/signup"];

const Header = () => {
  const pathname = usePathname();
  const showHeader = !authRoutes.includes(pathname);
  const { user, clearAll } = useAppStore();
  const router = useRouter();
  const { showSuccessToast } = useShowToast();

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
          {user?.name ? user.name : user.email}

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src="/guy1Profile.png"
                height={24}
                width={24}
                alt="Profile Photo"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="shadow-lg w-40" align="end">
              <div>
                <DropdownMenuItem className="cursor-pointer">
                  Your Account
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={onLogOut}>
                  Sign Out
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
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
