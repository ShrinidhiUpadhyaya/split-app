import {cn} from "@/lib/utils";
import Image from "next/image";

interface DAvatarProps {
  src: string;
  selected?: boolean;
  onClick?: () => void;
}

const DAvatar = ({src, selected, onClick}: DAvatarProps) => {
  return (
    <div
      className={cn(
        "relative h-40 w-40 cursor-pointer rounded-full border-8 p-1",
        selected && "primary-color-border border-[16px]",
      )}
      onClick={onClick}
    >
      <Image src={src} width={160} height={160} alt="Avatar" />
    </div>
  );
};

export default DAvatar;
