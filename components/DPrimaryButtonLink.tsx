import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface ButtonProps {
  label?: string;
  href?: string;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const DPrimaryButtonLink: React.FC<ButtonProps> = ({
  label,
  href = "",
  disabled,
  className,
  onClick,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({variant: "default"}),
        "w-full font-bold",
        disabled && "opacity-40",
        className,
      )}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default DPrimaryButtonLink;
