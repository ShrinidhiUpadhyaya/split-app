import {cn} from "@/lib/utils";
import DInfoCard from "./DInfoCard";

const BalanceCard = () => {
  return (
    <DInfoCard title="Your Balance">
      <div className="w-full space-y-2 border-[red]">
        <TextRow title="Balance" description="$ 100" color="white" />

        <TextRow title="You are owed" description="$ 100" color="#3EB991" className="pt-4" />
        <TextRow title="You are owed" description="$ 200" color="#E01563" />
      </div>
    </DInfoCard>
  );
};

interface DTextRowProps {
  title: string;
  description: string;
  color: string;
  className?: string;
}

const TextRow = ({title, description, color, className}: DTextRowProps) => (
  <div className={cn("flex items-end justify-between gap-4", className)}>
    <span className="text-xl">{title}</span>
    <span className={`text-2xl font-semibold text-[${color}]`}>{description}</span>
  </div>
);

export default BalanceCard;
