import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {cn} from "@/lib/utils";
import {Bell, Send} from "lucide-react";
import React, {useState} from "react";
import DTextLink from "../DTextLink";

interface FriendCardProps {
  friend?: Object | null | undefined;
  status?: number;
  className?: string;
}

const FriendCard: React.FC<FriendCardProps> = ({friend, status = -1, className}) => {
  const [friendStatus, setFriendStatus] = useState<number>(status);

  return (
    <div className={cn("w-full min-w-[240px] max-w-[320px]", className)}>
      <Card className="w-full shadow-xl">
        <CardHeader className="p-4">
          <CardTitle className="flex items-center gap-4 !text-3xl font-semibold">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className={cn("min-h-12 min-w-12 rounded-full bg-[white] shadow-sm")}></div>
              <span className="flex-1 overflow-hidden text-ellipsis">
                {friend?.name ? friend.name : friend.email}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-8">
            <div className="flex items-end justify-between">
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
          <div className="w-full space-y-8 py-4">
            <Separator className="bg-[#64748b]" />
            <div className="flex w-full items-end gap-4">
              <div className="flex flex-1">
                {friendStatus == 0 && (
                  <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#FF6F61] hover:bg-[#FF6F61]/95">
                    <Send color="white" />
                  </div>
                )}

                {friendStatus == 1 && (
                  <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#64748b] bg-[transparent] shadow-md hover:bg-[#64748b]/10">
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

export default FriendCard;
