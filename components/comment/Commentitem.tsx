import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { Comment, User } from "@prisma/client";
import Avatar from "../Avatar";

interface Props {
  comment: Comment & {
    user: User;
  };
}

const Commentitem = ({ comment }: Props) => {
  const router = useRouter();

  const createdAt = useMemo(() => {
    if (!comment?.createdAt) return null;

    return format(new Date(comment?.createdAt), "MMMM yyyy");
  }, [comment?.createdAt]);

  return (
    <div className="p-5 border-b border-neutral-800 transition hover:bg-neutral-900">
      <div className="flex items-center gap-2">
        <Avatar userId={comment.user.id} />

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p
              className="font-semibold cursor-pointer hover:underline"
              onClick={() => router.push(`/users/${comment.user.id}`)}
            >
              {comment.user.name}
            </p>

            <p
              className="text-neutral-500 text-sm cursor-pointer hover:underline"
              onClick={() => router.push(`/users/${comment.user.id}`)}
            >
              @{comment.user.username}
            </p>

            <p className="text-neutral-500 text-sm">{createdAt}</p>
          </div>

          <p className="text-sm mt-1">{comment.body}</p>
        </div>
      </div>
    </div>
  );
};

export default Commentitem;
