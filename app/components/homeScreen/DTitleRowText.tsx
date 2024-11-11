import {ChevronRight} from "lucide-react";
import DTypewriterText from "./DTypewriteText";

interface DTitleRowTextProps {
  title: string;
  description: string;
  separator?: boolean;
}

const DTitleRowText = ({title, description, separator}: DTitleRowTextProps) => {
  return (
    <div className="space-y-16">
      <div className="flex flex-col space-y-4 lg:flex-row lg:gap-16 lg:space-y-0">
        <div className="flex-1">
          <div className="w-full space-y-2">
            <h1 className="primary-color-text inline-flex p-0.5 text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
              <ChevronRight className="h-10 w-10 text-[#E01563] md:h-12 md:min-w-12 md:max-w-12" />
              <DTypewriterText text={title} />
            </h1>
          </div>
        </div>

        <p className="flex-1 text-xl">{description}</p>
      </div>
      {separator && (
        <div className="h-4 border-4 border-x-0 border-dotted border-white bg-transparent" />
      )}
    </div>
  );
};

export default DTitleRowText;
