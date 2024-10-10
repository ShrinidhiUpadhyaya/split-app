import React from "react";
import {ClipLoader} from "react-spinners";

interface SpinnerProps {
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const DLoadingSpinner: React.FC<SpinnerProps> = ({loading}) => {
  return (
    <ClipLoader
      color="#00BAF2"
      size={120}
      className="absolute left-[45%] top-[45%]"
      loading={loading}
    />
  );
};

export default DLoadingSpinner;
