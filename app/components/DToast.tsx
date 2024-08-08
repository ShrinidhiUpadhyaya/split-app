import {useToast} from "@/components/ui/use-toast";

const useShowToast = () => {
  const {toast} = useToast();
  const showErrorToast = (description: string) => {
    toast({
      variant: "destructive",
      description: description,
    });
  };

  const showSuccessToast = (description: string) => {
    toast({
      className: "bg-[#22C55E]",
      description: description,
    });
  };

  return {showErrorToast, showSuccessToast};
};

export default useShowToast;
