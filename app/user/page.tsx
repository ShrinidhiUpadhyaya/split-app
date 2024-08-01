"use client";
import Dashboard from "@/app/user/Dashboard";
import Friends from "@/app/user/Friends";
import Groups from "@/app/user/Groups";
import useShowToast from "@/components/DToast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {logOut} from "@/lib/authApi";
import {cn} from "@/lib/utils";
import {useAppStore} from "@/store/zustand";
import {Group, Handshake, LayoutDashboard} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React from "react";

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

const User: React.FC<SideNavNarProps> = ({className}) => {
  const {user, clearAll} = useAppStore();
  const router = useRouter();
  const {showSuccessToast} = useShowToast();

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
      <div className="flex h-16 w-full items-center justify-between gap-4 px-16">
        <Link href="/">
          <Image src={"logo.svg"} height={24} width={96} alt="Split logo" />
        </Link>

        <div className="flex flex-1 items-center justify-end">
          <p>{user?.name ?? user?.email}</p>

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
      </div>
      <Tabs defaultValue="dashboard" className={cn("w-full flex-1 md:flex md:gap-12", className)}>
        <TabsList className="flex h-full w-full items-start gap-8 md:w-[25%] md:flex-col">
          {sideNavBarOptions.map((option) => (
            <TabsTrigger
              key={option.value}
              value={option.value}
              className="flex h-12 w-full max-w-[360px] justify-center gap-4 rounded-md px-8 py-4 font-medium md:justify-start"
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
