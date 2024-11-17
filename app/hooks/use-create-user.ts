import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useCreateUser = () => {
  const {isPending, isError, isSuccess, data} = useQuery({
    queryKey: ["user"],
    queryFn: () => axios.get(`/api/user`),
  });

  return {isPending, isError, isSuccess, user: data?.data.profile, newUser: data?.data.newUser};
};

export default useCreateUser;
