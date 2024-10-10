import TransactionTable from "@/components/screenComponents/TransactionTable";
import {Separator} from "@/components/ui/separator";
import {Skeleton} from "@/components/ui/skeleton";
import useTransactions from "@/hooks/useTransactions";
import {useAppStore} from "@/store/zustand";
import {memo} from "react";

const Dashboard = () => {
  const {user} = useAppStore();
  const {transactions, oweAmount, owedAmount, isPending, isError} = useTransactions(user?._id);

  if (isPending) return <LoadingSkeleton />;

  if (isError) return <p className="mb-8 w-full text-4xl font-bold">Error Fetching Transactions</p>;

  return (
    <>
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
          <TransactionTable transactions={transactions} />
        </div>
      </div>
    </>
  );
};

const LoadingSkeleton = memo(() => (
  <div className="space-y-16 px-16">
    <div className="flex gap-32">
      {Array.from({length: 2}).map((_, index) => (
        <Skeleton key={`skeleton${index}`} className="h-8 w-full" />
      ))}
    </div>
    <Skeleton className="h-96 w-full" />
  </div>
));

LoadingSkeleton.displayName = "LoadingSkeleton";

export default Dashboard;
