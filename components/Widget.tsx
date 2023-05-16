import React from "react";
import { User } from "@prisma/client";
import useUsers from "@/hooks/useUsers";
import Avatar from "./Avatar";

const Widget = () => {
  const { data: users = [] } = useUsers();

  if (users?.length === 0) {
    return null;
  }

  return (
    <div className="hidden lg:block px-6 py-4">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="font-semibold">Who to follow</h2>

        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: User) => (
            <div key={user.id} className="flex items-center gap-4">
              <Avatar userId={user.id} />

              <div className="flex flex-col">
                <p className="text-sm font-semibold">{user.name}</p>

                <p className="text-sm text-neutral-400">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Widget;
