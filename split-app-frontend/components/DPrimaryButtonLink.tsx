import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
        buttonVariants({ variant: "default" }),
        "h-11 w-full text-lg font-bold",
        disabled && "opacity-40",
        className
      )}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default DPrimaryButtonLink;
