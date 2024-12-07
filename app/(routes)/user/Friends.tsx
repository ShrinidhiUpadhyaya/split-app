"use client";

import AddExpenseDialog from "@/components/screenComponents/AddExpenseDialog";
import AddFriendDialog from "@/components/screenComponents/AddFriendDialog";
import FriendCard from "@/components/screenComponents/FriendCard";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";
import useFetchFriends from "@/hooks/use-fetch-friends";
import {useAppStore} from "@/store/zustand";
import {memo} from "react";

const Friends = ({}) => {
  const {user} = useAppStore();
  const {friendTransactions, isPending, isError} = useFetchFriends(user?._id);

  if (isPending) return <LoadingSkeleton />;

  if (isError) return <p className="mb-8 w-full text-4xl font-bold">Error Fetching Expenses</p>;

  return (
    <div className="h-full w-full space-y-8 px-8">
      <div className="flex justify-center">
        {friendTransactions.length < 1 ? (
          <div className="flex w-[50%] flex-col justify-center gap-8 text-center">
            <p className="mb-8 w-full text-4xl font-bold">You have not added any friends yet</p>

            <AddFriendDialog />
          </div>
        ) : (
          <div className="w-full space-y-8">
            <div className="flex w-full">
              <AddFriendDialog />

              <div className="flex flex-1 justify-end gap-4">
                <AddExpenseDialog />
                <Button variant="secondary">Settle Up</Button>
              </div>
            </div>

            <div className="flex h-full w-full gap-8">
              {friendTransactions.map((friend) => (
                <FriendCard key={friend?.email} friend={friend} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LoadingSkeleton = memo(() => (
  <div className="space-y-16 px-16">
    <div className="flex gap-32">
      {Array.from({length: 2}).map((_, index) => (
        <Skeleton key={`skeleton${index}`} className="h-8 w-full" />
      ))}
    </div>
    <div className="flex w-full gap-8">
      {Array.from({length: 3}).map((_, index) => (
        <Skeleton key={`skeleton${index}`} className="h-[400px] flex-1" />
      ))}
    </div>
    <div className="flex w-full gap-8">
      {Array.from({length: 3}).map((_, index) => (
        <Skeleton key={`skeleton${index}`} className="h-[400px] flex-1" />
      ))}
    </div>
  </div>
));

LoadingSkeleton.displayName = "LoadingSkeleton";

export default Friends;
