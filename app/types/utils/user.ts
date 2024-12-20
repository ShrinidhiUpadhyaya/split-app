import {Avatar} from "@prisma/client";

type User = {
  id: string;
  name: string;
  avatar: Avatar;
};

export default User;
