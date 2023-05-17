import React from "react";
import Image from "next/image";
import useUser from "@/hooks/useUser";
import Avatar from "../Avatar";

interface Props {
  userId: string;
}

const UserHero = ({ userId }: Props) => {
  const { data: user } = useUser(userId);

  return (
    <div>
      <div className="relative bg-neutral-700 h-44">
        {user.coverImage && (
          <Image
            className="object-cover"
            src={user.coverImage}
            fill
            alt="cover image"
          />
        )}

        <div className="absolute -bottom-12 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
