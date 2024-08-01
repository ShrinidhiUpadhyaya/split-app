import {cn} from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface TextLinkProps {
  label?: string;
  className?: string;
  href?: string;
}

const DTextLink: React.FC<TextLinkProps> = ({label, href = "/", className}) => {
  return (
    <Link href={href} className={cn("primaryColorFont text-sm font-semibold block", className)}>
      {label}
    </Link>
  );
};

export default DTextLink;
