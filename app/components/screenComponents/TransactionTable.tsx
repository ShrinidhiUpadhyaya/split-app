import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {cn, formatDate} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../ui/tooltip";

const TransactionTable = ({transactions}) => {
  return (
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
            {transactions.map((transaction) => (
              <TableRow key={transaction.description}>
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar>
                          <AvatarImage src={transaction.paidBy.picture} />
                          <AvatarFallback>
                            {transaction.paidBy.name
                              ? transaction.paidBy.name[0].toUpperCase()
                              : transaction.paidBy.email[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {transaction.paidBy.name
                            ? transaction.paidBy.name
                            : transaction.paidBy.email}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell className="flex gap-1">
                  {transaction.sharedWith.map((user) => (
                    <TooltipProvider key={user.email}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Avatar>
                            <AvatarImage src={user.picture} />
                            <AvatarFallback>
                              {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
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
                    transaction.isOwed ? "text-[#3EB991]" : "text-[#E01563]",
                  )}
                >
                  <div className="flex justify-end gap-2">
                    <div>
                      ${transaction.yourAmount.toFixed(2)}
                      <p className="text-md text-[#64748b]">
                        ${transaction.totalAmount.toFixed(2)}
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
  );
};

export default TransactionTable;
