import React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface ButtonProps {
  label?: string;
  icon?: string;
  className?: string;
}

const DSocialLoginButton: React.FC<ButtonProps> = ({
  label = "Label",
  icon = "",
  className,
}) => {
  return (
    <div>
      <Link
        className={cn(
          "border-2 border-[#5E5D6073] flex gap-4 text-lg font-semibold h-11 rounded-xl",
          // buttonVariants({ variant: "outline" }),
          className
        )}
        href="/"
      >
        <div className="w-full h-full flex items-center justify-center gap-4">
          <Image src={icon} height={24} width={24} alt="Login with Google" />
          {label}
        </div>
      </Link>
    </div>
  );
};

export default DSocialLoginButton;
