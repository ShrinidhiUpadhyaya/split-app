import {cn} from "@/lib/utils";
import {Button, ButtonProps} from "./ui/button";

interface DIconTextButtonProps extends ButtonProps {
  label: string;
  icon: React.ReactNode;
}

const DIconTextButton = ({label, icon, className, ...buttonProps}: DIconTextButtonProps) => {
  return (
    <Button className={cn("gap-1", className)} {...buttonProps}>
      {icon}
      {label}
    </Button>
  );
};

export default DIconTextButton;
