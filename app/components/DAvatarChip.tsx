import {Avatar} from "@prisma/client";
import {X} from "lucide-react";
import UserAvatar from "./DUserAvatar";
import {Badge} from "./ui/badge";

interface DAvatarChipProps {
  name: string;
  src: Avatar;
}

const DAvatarChip = ({name, src}: DAvatarChipProps) => {
  return (
    <Badge variant="secondary" className="cursor-pointer gap-1 p-1">
      <UserAvatar src={src} label={name} />
      <div className="ml-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full hover:bg-muted-foreground">
        <X className="h-4 w-4 text-[#E01563]" />
      </div>
    </Badge>
  );
};

export default DAvatarChip;
