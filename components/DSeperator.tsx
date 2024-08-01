import {cn} from "@/lib/utils";
import React from "react";

interface SeperatorProps {
  label?: string;
  className?: string;
  labelClassName?: string;
}

const DSeperator: React.FC<SeperatorProps> = ({label = "OR", className, labelClassName}) => {
  return (
    <div className={cn("bg-[#5E5D6073]/15 w-full h-1 rounded-xl relative", className)}>
      {label && (
        <p
          className={cn(
            "p-1 px-2 bg-[#020817] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2",
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
