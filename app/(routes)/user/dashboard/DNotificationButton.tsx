import {Button} from "@/components/ui/button";
import {BellRing} from "lucide-react";

const DNotificationButton = () => {
  return (
    <Button className="relative gap-1" size="sm" variant="outline">
      <span className="absolute -right-3 -top-3 h-5 w-5 rounded-full bg-[#E01563] text-white">
        2
      </span>
      <BellRing className="h-5 w-5 text-white" />
    </Button>
  );
};

export default DNotificationButton;
