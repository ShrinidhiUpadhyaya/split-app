import useShowToast from "@/components/DToast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {useRouter} from "next/navigation";

const useAcceptFriends = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {showErrorToast, showSuccessToast} = useShowToast();

  const {mutate, isPending, isError, isSuccess, error, data} = useMutation({
    mutationFn: (id: string) => axios.post("/api/friends/accept", {id: id}),

    onError: () => {
      showErrorToast("Could not accept friend request");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["friend-requests"]});
      router.refresh();
      showSuccessToast("Accepted Friend Request");
    },
  });

  const acceptRequest = (id: string) => {
    mutate(id);
  };

  return {acceptRequest, isPending, isError, isSuccess, error, data};
};

export default useAcceptFriends;
