import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface ButtonProps {
  href?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const DPrimaryButtonLink: React.FC<ButtonProps> = ({
  children,
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
      {children}
    </Link>
  );
};

export default DPrimaryButtonLink;
