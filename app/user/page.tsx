import Dashboard from "@/app/user/Dashboard";
import Friends from "@/app/user/Friends";
import Groups from "@/app/user/Groups";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {cn} from "@/lib/utils";
import {Group, Handshake, LayoutDashboard} from "lucide-react";
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
  return (
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
  );
};

export default User;
