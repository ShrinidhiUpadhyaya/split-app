import {cn} from "@/lib/utils";
import {Avatar} from "@prisma/client";
import {Check} from "lucide-react";
import DUserAvatar from "./DUserAvatar";
import {CommandItem} from "./ui/command";

interface DUserAvatarCommandItemProps {
  value: string;
  label: string;
  avatar: Avatar;
  checked: boolean;
  onSelect?: () => void;
}

const DUserAvatarCommandItem: React.FC<DUserAvatarCommandItemProps> = ({
  value,
  label,
  avatar,
  checked,
  onSelect,
}) => {
  return (
    <CommandItem value={value} onSelect={onSelect}>
      <DUserAvatar label={label} avatar={avatar} />
      <Check className={cn("ml-auto", checked ? "opacity-100" : "opacity-0")} />
    </CommandItem>
  );
};

export default DUserAvatarCommandItem;
