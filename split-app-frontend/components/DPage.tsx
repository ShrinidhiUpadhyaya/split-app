import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageProps {
  children?: React.ReactNode;
  className?: string;
}
const DPage: React.FC<PageProps> = ({ children, className }) => {
  return (
    <motion.div
      className={cn(
        "w-full h-svh flex flex-col items-center relative gap-8 pt-8",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default DPage;
