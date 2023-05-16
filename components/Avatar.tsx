import useUser from "@/hooks/useUser";
import React from "react";

interface Props {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar = ({ userId, isLarge, hasBorder }: Props) => {
  const { data: user } = useUser(userId);

  return <div></div>;
};

export default Avatar;
