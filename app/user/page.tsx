"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Handshake, Group } from "lucide-react";
import { cn } from "@/lib/utils";
import Dashboard from "@/app/user/Dashboard";
import Friends from "@/app/user/Friends";
import Groups from "@/app/user/Groups";
import { useAppStore } from "@/store/zustand";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logOut } from "@/lib/authApi";
import useShowToast from "@/components/DToast";
import Image from "next/image";
import Link from "next/link";

interface SideNavNarProps {
  className?: string;
}

const sideNavBarOptions = [
  {
    label: "Dashboard",
    value: "dashboard",
    icon: <LayoutDashboard />,
  },

  {
    label: "Groups",
    value: "groups",
    icon: <Group />,
  },

  {
    label: "Friends",
    value: "friends",
    icon: <Handshake />,
  },
];

const User: React.FC<SideNavNarProps> = ({ className }) => {
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
    <>
      <div className="w-full flex justify-between items-center gap-4 h-16 px-16">
        <Link href="/">
          <Image src={"logo.svg"} height={24} width={96} alt="Split logo" />
        </Link>

        <div className="flex-1 flex items-center justify-end">
          <p>{user?.name ?? user?.email}</p>

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
              <DropdownMenuItem className="cursor-pointer">
                Your Account
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={onLogOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Tabs
        defaultValue="dashboard"
        className={cn("flex-1 w-full md:flex md:gap-12", className)}
      >
        <TabsList className="flex md:flex-col items-start gap-8 h-full md:w-[25%] w-full">
          {sideNavBarOptions.map((option) => (
            <TabsTrigger
              key={option.value}
              value={option.value}
              className="max-w-[360px] w-full font-medium gap-4 flex justify-center md:justify-start h-12 rounded-md px-8 py-4"
            >
              <span>{option.icon}</span>
              <span className="hidden sm:flex">{option.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
        <TabsContent value="groups">
          <Groups />
        </TabsContent>
        <TabsContent value="friends" className="w-full">
          <Friends />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default User;
