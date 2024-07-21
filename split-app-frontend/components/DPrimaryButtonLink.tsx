import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface ButtonProps {
  label?: string;
  className?: string;
}

const DPrimaryButtonLink: React.FC<ButtonProps> = ({ label, className }) => {
  return (
    <Link
      href=""
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
