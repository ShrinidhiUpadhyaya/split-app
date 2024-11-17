import DIconTextButton from "@/components/DIconTextButton";
import {Label} from "@radix-ui/react-label";
import {Check, X} from "lucide-react";
import DInfoCard from "./DInfoCard";

const FriendRequestsCard = () => {
  return (
    <DInfoCard title="Requests">
      <div className="flex items-center justify-between">
        <Label htmlFor="name">Avatar</Label>
        <Label htmlFor="name">Name</Label>
        <Label htmlFor="name">Time</Label>
        <div className="flex space-x-4">
          <DIconTextButton
            label="Accept"
            className="bg-[#3EB991]"
            size="sm"
            icon={<Check className="h-5 w-5" />}
          />

          <DIconTextButton
            label="Reject"
            variant="destructive"
            size="sm"
            icon={<X className="h-5 w-5" />}
          />
        </div>
      </div>
    </DInfoCard>
  );
};

export default FriendRequestsCard;
