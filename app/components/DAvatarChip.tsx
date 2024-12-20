import {Avatar} from "@prisma/client";
import {X} from "lucide-react";
import DUserAvatar from "./DUserAvatar";
import {Badge} from "./ui/badge";

interface DAvatarChipProps {
  label: string;
  src: Avatar;
}

const DAvatarChip = ({label, src}: DAvatarChipProps) => {
  return (
    <Badge variant="secondary" className="cursor-pointer gap-1 p-1">
      <DUserAvatar src={src} label={label} />
      <div className="ml-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full hover:bg-muted-foreground">
        <X className="h-4 w-4 text-[#E01563]" />
      </div>
    </Badge>
  );
};

export default DAvatarChip;
