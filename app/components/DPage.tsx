"use client";

import {cn} from "@/lib/utils";
import {motion} from "framer-motion";
import React from "react";

interface PageProps {
  children?: React.ReactNode;
  className?: string;
}

const DPage: React.FC<PageProps> = ({children, className}) => {
  return (
    <motion.div
      className={cn("relative flex h-svh w-full flex-col items-center gap-8 pt-8", className)}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{ease: "easeInOut", duration: 0.4}}
    >
      {children}
    </motion.div>
  );
};

export default DPage;
