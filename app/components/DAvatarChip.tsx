import {cn} from "@/lib/utils";
import {Avatar} from "@prisma/client";
import {X} from "lucide-react";
import UserAvatar from "./DUserAvatar";
import {Badge} from "./ui/badge";

interface DAvatarChipProps {
  label: string;
  src: Avatar;
  className: string;
}

const DAvatarChip = ({label, src, className}: DAvatarChipProps) => {
  return (
    <Badge variant="secondary" className={cn("cursor-pointer gap-1 p-1", className)}>
      <UserAvatar src={src} label={label} />
      <div className="ml-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full hover:bg-muted-foreground">
        <X className="h-4 w-4 text-[#E01563]" />
      </div>
    </Badge>
  );
};

export default DAvatarChip;
