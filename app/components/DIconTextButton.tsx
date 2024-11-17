import {cn} from "@/lib/utils";
import {Button, ButtonProps} from "./ui/button";

interface DIconTextButtonProps extends ButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const DIconTextButton = ({
  label,
  icon,
  onClick,
  className,
  ...buttonProps
}: DIconTextButtonProps) => {
  return (
    <Button className={cn("gap-1", className)} {...buttonProps} onClick={onClick}>
      <span>{icon}</span>
      {label}
    </Button>
  );
};

export default DIconTextButton;
