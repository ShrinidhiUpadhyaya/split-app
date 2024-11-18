import DIconTextButton from "@/components/DIconTextButton";
import AddExpenseDialog from "@/components/screenComponents/AddExpenseDialog";
import AddFriendDialog from "@/components/screenComponents/AddFriendDialog";
import {Users, Wallet} from "lucide-react";
import DInfoCard from "./DInfoCard";

const QuickActionsCard = () => {
  return (
    <DInfoCard title="Quick Actions" className="flex-0 w-2/6">
      <div className="flex flex-col space-y-4">
        <AddFriendDialog />

        <DIconTextButton label="Create Group" icon={<Users />} variant="outline" />

        <AddExpenseDialog />

        <DIconTextButton label="Settle Up" icon={<Wallet />} variant="outline" />
      </div>
    </DInfoCard>
  );
};

export default QuickActionsCard;
