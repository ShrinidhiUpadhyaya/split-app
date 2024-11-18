import DAvatar from "@/components/DAvatar";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import useAcceptFriends from "@/hooks/use-accept-request";
import useFriendRequests from "@/hooks/use-friend-requests";
import {calculateTimeDifference} from "@/lib/friend-request-time";
import getAvatarType from "@/lib/get-avatar-type";
import {Check, X} from "lucide-react";
import {useEffect, useState} from "react";
import DInfoCard from "./DInfoCard";

const FriendRequestsCard = () => {
  const {data} = useFriendRequests();
  const {acceptRequest} = useAcceptFriends();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    let requests = data?.data;
    setRequests(requests);
  }, [data]);

  return (
    <DInfoCard title="Requests" className="w-2/6">
      <div className="flex items-center justify-between">
        {requests?.map((user) => (
          <div key={user.id} className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <DAvatar src={getAvatarType(user?.request.avatar)} className="h-16 w-16" />

              <div className="flex flex-col">
                <Label htmlFor="name" className="text-xl">
                  {user.request.name}
                </Label>

                <Label htmlFor="name" className="text-muted-foreground">
                  {calculateTimeDifference(user.createdAt)}
                </Label>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#3EB991]" size="sm" onClick={() => acceptRequest(user.id)}>
                <Check className="h-5 w-5" />
              </Button>
              <Button variant="destructive" size="sm">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DInfoCard>
  );
};

export default FriendRequestsCard;
