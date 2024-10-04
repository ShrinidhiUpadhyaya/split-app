import TransactionTable from "@/components/screenComponents/TransactionTable";
import {Separator} from "@/components/ui/separator";
import useTransactions from "@/hooks/useTransactions";
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
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;
