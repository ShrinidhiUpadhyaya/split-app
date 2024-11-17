import DAvatar from "@/components/DAvatar";
import {Separator} from "@/components/ui/separator";
import useCreateUser from "@/hooks/use-create-user";
import getAvatarType from "@/lib/get-avatar-type";
import DNotificationButton from "./DNotificationButton";

const Header = () => {
  const {isSuccess, user, newUser} = useCreateUser();

  return (
    <>
      <div className="flex gap-4">
        <DAvatar src={getAvatarType(user?.avatar)} className="h-24 w-24" />
        <div className="flex flex-col gap-2 pt-1">
          <p className="text-4xl font-semibold">Shrinidhi</p>
          <p>Hello, Welcome Back!!</p>
        </div>
        <div className="flex flex-1 justify-end gap-4">
          <DNotificationButton />
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Header;
