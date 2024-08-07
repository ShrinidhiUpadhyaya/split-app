import {cn} from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface TextLinkProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const DTextLink: React.FC<TextLinkProps> = ({href = "/", children, className}) => {
  return (
    <Link
      href={href}
      className={cn("primaryColorFont block text-sm font-semibold hover:underline", className)}
    >
      {children}
    </Link>
  );
};

export default DTextLink;
