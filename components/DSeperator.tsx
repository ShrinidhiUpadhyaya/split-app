import {cn} from "@/lib/utils";
import React from "react";

interface SeperatorProps {
  label?: string;
  className?: string;
  labelClassName?: string;
}

const DSeperator: React.FC<SeperatorProps> = ({label = "OR", className, labelClassName}) => {
  return (
    <div className={cn("relative h-1 w-full rounded-xl bg-[#5E5D6073]/15", className)}>
      {label && (
        <p
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-[#020817] p-1 px-2",
            labelClassName,
          )}
        >
          {label}
        </p>
      )}
    </div>
  );
};

export default DSeperator;
