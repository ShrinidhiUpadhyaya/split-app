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
    <div className={cn("w-full min-w-[240px] max-w-[360px]", className)}>
      <Card className="flex h-[400px] w-full flex-col p-4 shadow-xl">
        <CardHeader className="p-4">
          <CardTitle className="flex items-center gap-4 font-semibold">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className={cn("min-h-12 min-w-12 rounded-full bg-[white] shadow-sm")}></div>

              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl">
                {" "}
                {friend?.name ? friend.name : friend.email}{" "}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-4">
          {friend?.owedBy == 0 && friend?.owes == 0 ? (
            <p className="flex h-full w-full items-center justify-center text-3xl font-semibold text-muted-foreground">
              No Expenses
            </p>
          ) : (
            <div className="space-y-8">
              <div className="flex items-end justify-between">
                <span>{friend?.owedBy != 0 ? "You owe" : "You are owed"}</span>
                <span className="text-4xl font-semibold">
                  {friend?.owedBy != 0 ? (
                    <span className="text-[#E01563]">$ {friend.owedBy}</span>
                  ) : (
                    <span className="text-[#3EB991]">$ {friend.owes}</span>
                  )}
                </span>
              </div>

              <div>
                <p className="mb-2">Expenses History</p>
                {friend?.transactions?.map((transaction) => (
                  <div className="flex justify-between" key={transaction.description}>
                    <span className="text-[#64748b]">{transaction.description}</span>
                    {transaction.type == "owes" ? (
                      <span className="text-[#3EB991]">$ {transaction.amount}</span>
                    ) : (
                      <span className="text-[#E01563]">$ {transaction.amount}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="w-full space-y-8">
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

              <DTextLink className="text-lg">more...</DTextLink>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FriendCard;
