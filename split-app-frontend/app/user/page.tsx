import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Handshake, Group } from "lucide-react";
import { cn } from "@/lib/utils";
import Dashboard from "@/app/user/Dashboard";
import Friends from "@/app/user/Friends";
import Groups from "@/app/user/Groups";

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
  return (
    <Tabs
      defaultValue="dashboard"
      className={cn("flex-1 w-full md:flex md:gap-12", className)}
    >
      <TabsList className="flex md:flex-col items-start gap-8 h-full md:w-[25%] w-full">
        {sideNavBarOptions.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className="max-w-[360px] w-full text-lg font-medium gap-4 flex justify-center md:justify-start h-12 rounded-md px-8 py-4 data-[state=active]:bg-[#00BAF2] data-[state=active]:text-[white]"
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
      <TabsContent value="friends">
        <Friends />
      </TabsContent>
    </Tabs>
  );
};

export default User;
