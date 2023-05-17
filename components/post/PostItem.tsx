import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import Avatar from "../Avatar";
import { format } from "date-fns";
import { useRouter } from "next/router";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Comment, Post, User } from "@prisma/client";
import { AiOutlineMessage, AiOutlineHeart } from "react-icons/ai";

interface Props {
  userId: string;
  post: Post & {
    user: User;
    comments: Comment[];
  };
}

const PostItem = ({ userId, post }: Props) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const createdAt = useMemo(() => {
    if (!post?.createdAt) return null;

    return format(new Date(post.createdAt), "MMMM yyyy");
  }, [post?.createdAt]);

  const onLikeHandler = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
  }, [currentUser, loginModal]);

  return (
    <div className="p-5 border-b border-neutral-800 cursor-pointer hover:bg-neutral-900 transition">
      <div className="flex items-center gap-2">
        <Avatar userId={post.user.id} />

        <span
          className="font-semibold cursor-pointer hover:underline"
          onClick={() => router.push(`/users/${post.user.id}`)}
        >
          {post.user.name}
        </span>

        <span
          className="hidden md:inline text-neutral-500 text-sm cursor-pointer hover:underline"
          onClick={() => router.push(`/users/${post.user.id}`)}
        >
          @{post.user.username}
        </span>

        <span className="text-neutral-500 text-sm">{createdAt}</span>
      </div>

      <div className="mt-2" onClick={() => router.push(`/posts/${post.id}`)}>
        <div className="text-sm">{post.body}</div>

        {post.image && (
          <div className="relative w-full h-44 md:h-52 mt-2">
            <Image
              className="object-cover"
              fill
              src={post.image}
              alt="post_img"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-10 mt-3">
        <div className="flex items-center justify-center gap-2 text-neutral-500 cursor-pointer transition hover:text-sky-500">
          <AiOutlineMessage size={22} />

          <p>{post.comments.length || 0}</p>
        </div>

        <div
          onClick={onLikeHandler}
          className="flex items-center justify-center gap-2 text-neutral-500 cursor-pointer transition hover:text-red-500"
        >
          <AiOutlineHeart size={22} />

          <p>{post.likesIds.length || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
