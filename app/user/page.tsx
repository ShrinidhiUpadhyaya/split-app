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
    <Tabs defaultValue="dashboard" className={cn("flex-1 w-full md:flex md:gap-12", className)}>
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
  );
};

export default User;
