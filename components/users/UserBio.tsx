import React, { useMemo } from "react";
import Button from "../Button";
import { format } from "date-fns";
import { BiCalendar } from "react-icons/bi";
import useUser from "@/hooks/useUser";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";

interface Props {
  userId: string;
}

const UserBio = ({ userId }: Props) => {
  const editModal = useEditModal();

  const { data: currentUser } = useCurrentUser();

  const { data: user } = useUser(userId);

  const createdAt = useMemo(() => {
    if (!user?.createdAt) return null;

    return format(new Date(user.createdAt), "MMMM yyyy");
  }, [user?.createdAt]);

  return (
    <div className="pb-4 border-b border-neutral-800">
      <div className="flex justify-end p-2 pr-4">
        {currentUser?.id === user?.id ? (
          <Button label="Edit" onClick={() => editModal.onOpen()} secondary />
        ) : (
          <Button label="Follow" onClick={() => {}} secondary />
        )}
      </div>

      <div className="px-4 mt-2">
        <div className="flex flex-col">
          <p className="font-semibold">{user?.name}</p>

          <p className="text-sm text-neutral-500">@{user?.username}</p>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          {user?.bio && <p>{user?.bio}</p>}

          <div className="flex items-center gap-2 text-neutral-500 text-sm">
            <BiCalendar size={24} />

            <p>Joined {createdAt}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center gap-1 text-sm">
            <p>{user?.followingIds?.length}</p>

            <p className="text-neutral-500">Following</p>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <p>{user?.followersCount || 0}</p>

            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
