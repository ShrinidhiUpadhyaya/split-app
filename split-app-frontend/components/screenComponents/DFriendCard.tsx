import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Send, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import DTextLink from "../DTextLink";

interface FriendCardProps {
  friend?: Object | null | undefined;
  status?: number;
  className?: string;
}

const DFriendCard: React.FC<FriendCardProps> = ({
  friend,
  status = -1,
  className,
}) => {
  const [friendStatus, setFriendStatus] = useState<number>(status);

  return (
    <div className={cn("w-full min-w-[240px] max-w-[320px]", className)}>
      <Card className="w-full bg-[#CCF2FF] shadow-xl">
        <CardHeader className="p-4">
          <CardTitle className="font-semibold flex gap-4 items-center !text-3xl">
            <div className="flex items-center gap-2 overflow-hidden">
              <div
                className={cn(
                  "rounded-full min-h-12 min-w-12 shadow-sm bg-[red]"
                )}
              ></div>
              <span className="flex-1 overflow-hidden text-ellipsis">
                {friend?.name ? friend.name : friend.email}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <span className="font-semibold">You Owe</span>
              <span className="text-4xl font-semibold">$100</span>
            </div>

            <div>
              <p>Transation History</p>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Lidl</span>
                <span className="text-[#E01563]">$10</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#64748b]">Aldi</span>
                <span className="text-[#E01563]">$200</span>
              </div>
            </div>
          </div>

          <div></div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="w-full py-4 space-y-8">
            <Separator className="bg-[#64748b]" />
            <div className="w-full flex gap-4 items-end">
              <div className="flex flex-1">
                {friendStatus == 0 && (
                  <div className="h-12 w-12 rounded-full bg-[#FF6F61] flex items-center justify-center hover:bg-[#FF6F61]/95 cursor-pointer">
                    <Send color="white" />
                  </div>
                )}

                {friendStatus == 1 && (
                  <div className="h-12 w-12 rounded-full bg-[transparent] border shadow-md border-[#64748b] flex items-center justify-center hover:bg-[#64748b]/10 cursor-pointer">
                    <Bell color="#64748b" />
                  </div>
                )}
              </div>

              <DTextLink label="more..." className="text-lg" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DFriendCard;
