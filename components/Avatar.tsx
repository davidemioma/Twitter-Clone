import React, { useCallback } from "react";
import Image from "next/image";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";

interface Props {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar = ({ userId, isLarge, hasBorder }: Props) => {
  const router = useRouter();

  const { data: user } = useUser(userId);

  const onClick = useCallback(() => {
    router.push(`/users/${userId}`);
  }, [router, userId]);

  return (
    <div
      className={`relative ${isLarge ? "h-24 w-24" : "h-12 w-12"} ${
        hasBorder && "border-4 border-black"
      } rounded-full cursor-pointer transition hover:opacity-90`}
    >
      <Image
        className="rounded-full object-cover"
        src={user?.profileImage || "/assets/no-user.gif"}
        fill
        alt="Avatar"
        onClick={onClick}
      />
    </div>
  );
};

export default Avatar;
