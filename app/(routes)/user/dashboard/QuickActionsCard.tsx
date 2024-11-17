import DIconTextButton from "@/components/DIconTextButton";
import {Plus, UserPlus, Users, Wallet} from "lucide-react";
import DInfoCard from "./DInfoCard";

const QuickActionsCard = () => {
  return (
    <DInfoCard title="Quick Actions">
      <div className="flex flex-col space-y-4">
        <DIconTextButton label="Add Friends" icon={<UserPlus />} variant="outline" />
        <DIconTextButton label="Create Group" icon={<Users />} variant="outline" />
        <DIconTextButton label="Add Expense" icon={<Plus />} variant="outline" />
        <DIconTextButton label="Settle Up" icon={<Wallet />} variant="outline" />
      </div>
    </DInfoCard>
  );
};

export default QuickActionsCard;
