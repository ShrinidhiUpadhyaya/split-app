import {Skeleton} from "@/components/ui/skeleton";
import BalanceCard from "./dashboard/BalanceCard";
import FriendRequestsCard from "./dashboard/FriendRequestsCard";
import Header from "./dashboard/Header";
import QuickActionsCard from "./dashboard/QuickActionsCard";
import TransactionsCard from "./dashboard/TransactionsCard";

const Dashboard = () => {
  // const {user} = useAppStore();
  // const {transactions, oweAmount, owedAmount, isPending, isError} = useTransactions(user?._id);

  // if (isPending) return <LoadingSkeleton />;

  // if (isError) return <p className="mb-8 w-full text-4xl font-bold">Error Fetching Transactions</p>;

  return (
    <>
      <div className="h-full w-full space-y-8 px-16">
        <Header />

        <div className="flex gap-8">
          <BalanceCard />
          <QuickActionsCard />
        </div>

        <div className="flex gap-8">
          <TransactionsCard />
          <FriendRequestsCard />
        </div>

        {/* <div className="space-y-4">
          <TransactionTable transactions={transactions} />
        </div> */}
      </div>
    </>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-16 px-16">
    <div className="flex gap-32">
      {Array.from({length: 2}).map((_, index) => (
        <Skeleton key={`skeleton${index}`} className="h-8 w-full" />
      ))}
    </div>
    <Skeleton className="h-96 w-full" />
  </div>
);

LoadingSkeleton.displayName = "LoadingSkeleton";

export default Dashboard;
