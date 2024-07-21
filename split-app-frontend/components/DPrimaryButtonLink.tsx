import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface ButtonProps {
  label?: string;
  className?: string;
  href?: string;
}

const DPrimaryButtonLink: React.FC<ButtonProps> = ({
  label,
  href = "",
  className,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "default" }),
        "h-11 w-full text-lg font-bold",
        className
      )}
    >
      {label}
    </Link>
  );
};

export default DPrimaryButtonLink;
