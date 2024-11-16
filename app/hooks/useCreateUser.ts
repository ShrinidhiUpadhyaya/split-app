import prisma from "@/lib/db";
import {currentUser} from "@clerk/nextjs/server";

const useCreateUser = async () => {
  const user = await currentUser();

  if (!user) {
    return -1;
  }

  const profile = await prisma.user.findUnique({where: {userId: user.id}});

  if (profile) {
    return {profile: profile, newUser: false};
  }

  const newProfile = await prisma.user.create({
    data: {
      userId: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName}  ${user.lastName}`,
    },
  });

  return newProfile;
};

export default useCreateUser;
