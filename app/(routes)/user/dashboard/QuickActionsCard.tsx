import DIconTextButton from "@/components/DIconTextButton";
import AddFriendDialog from "@/components/screenComponents/AddFriendDialog";
import {Plus, Users, Wallet} from "lucide-react";
import DInfoCard from "./DInfoCard";

const QuickActionsCard = () => {
  return (
    <DInfoCard title="Quick Actions">
      <div className="flex flex-col space-y-4">
        <AddFriendDialog />

        <DIconTextButton label="Create Group" icon={<Users />} variant="outline" />
        <DIconTextButton label="Add Expense" icon={<Plus />} variant="outline" />
        <DIconTextButton label="Settle Up" icon={<Wallet />} variant="outline" />
      </div>
    </DInfoCard>
  );
};

export default QuickActionsCard;
