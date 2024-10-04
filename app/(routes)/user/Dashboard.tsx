import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import useTransactions from "@/hooks/useTransactions";
import {cn, formatDate} from "@/lib/utils";
import {useAppStore} from "@/store/zustand";

const Dashboard = () => {
  const {user} = useAppStore();
  const {transactions, oweAmount, owedAmount} = useTransactions(user?._id);

  return (
    <div className="h-full w-full space-y-8 px-16">
      <div className="flex gap-32">
        <div className="flex flex-1 items-end gap-4">
          <span className="text-2xl">You are owed</span>
          <span className="text-4xl font-semibold text-[#3EB991]">$ {owedAmount}</span>
        </div>

        <div className="flex flex-1 items-end gap-4">
          <span className="text-2xl">You owe</span>
          <span className="text-4xl font-semibold text-[#E01563]">$ {oweAmount}</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="text-lg">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-left">Description</TableHead>
                  <TableHead>Paid By</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Involved</TableHead>
                  <TableHead className="text-right">Your Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((invoice) => (
                  <TableRow key={invoice.description}>
                    <TableCell className="font-medium">{invoice.description}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Avatar>
                              <AvatarImage src={invoice.paidBy.picture} />
                              <AvatarFallback>
                                {invoice.paidBy.name
                                  ? invoice.paidBy.name[0].toUpperCase()
                                  : invoice.paidBy.email[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {invoice.paidBy.name ? invoice.paidBy.name : invoice.paidBy.email}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>{formatDate(invoice.date)}</TableCell>
                    <TableCell className="flex gap-1">
                      {invoice.sharedWith.map((user) => (
                        <TooltipProvider key={user.email}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Avatar>
                                <AvatarImage src={user.picture} />
                                <AvatarFallback>
                                  {user.name
                                    ? user.name[0].toUpperCase()
                                    : user.email[0].toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{user.name ? user.name : user.email}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-semibold",
                        invoice.isOwed ? "text-[#3EB991]" : "text-[#E01563]",
                      )}
                    >
                      <div className="flex justify-end gap-2">
                        <div>
                          ${invoice.yourAmount.toFixed(2)}
                          <p className="text-md text-[#64748b]">
                            ${invoice.totalAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
