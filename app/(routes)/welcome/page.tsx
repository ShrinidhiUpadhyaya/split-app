import DPage from "@/components/DPage";
import useCreateUser from "@/hooks/useCreateUser";
import {redirect} from "next/navigation";
import AvatarSelect from "./AvatarSelect";

const WelcomeScreen = () => {
  const user = useCreateUser();

  if (!user) {
    redirect("/");
  }

  if (!user?.newUser) {
    redirect("/user");
  }

  return (
    <DPage>
      <div className="flex flex-col items-center space-y-8">
        <div>
          <p className="mb-2 w-full text-center text-4xl font-bold">Welcome to Split</p>
          <p className="w-full text-center text-xl">Select your avatar</p>
        </div>

        <AvatarSelect />
      </div>
    </DPage>
  );
};

export default WelcomeScreen;
