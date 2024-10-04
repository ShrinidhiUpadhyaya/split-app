"use client";
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
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Handshake, LayoutDashboard} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React from "react";
import Dashboard from "./Dashboard";
import Friends from "./Friends";

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
    label: "Friends",
    value: "friends",
    icon: <Handshake />,
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      gcTime: 600000,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <>
        <div className="flex h-16 w-full items-center justify-between gap-4 px-8 pl-10">
          <Link href="/">
            <Image src={"logo.svg"} height={24} width={96} alt="Split logo" />
          </Link>

          <div className="flex flex-1 items-center justify-end gap-4 pr-8">
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
        <Tabs
          defaultValue="dashboard"
          className={cn("h-svh w-full flex-1 py-8 md:flex md:gap-12", className)}
        >
          <TabsList className="flex h-full min-w-[360px] max-w-[360px] items-start justify-start gap-8 px-4 md:w-[25%] md:flex-col">
            {sideNavBarOptions.map((option) => (
              <TabsTrigger
                key={option.value}
                value={option.value}
                className="flex h-11 w-full justify-center gap-4 rounded-md p-8 text-base font-bold md:justify-start"
              >
                <span>{option.icon}</span>
                <span className="hidden sm:flex">{option.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="dashboard" className="w-full">
            <Dashboard />
          </TabsContent>
          <TabsContent value="friends" className="w-full">
            <Friends />
          </TabsContent>
        </Tabs>
      </>
    </QueryClientProvider>
  );
};

export default User;
