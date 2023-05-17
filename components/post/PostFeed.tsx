import React from "react";
import PostItem from "./PostItem";
import { Post } from "@prisma/client";
import usePosts from "@/hooks/usePosts";

interface Props {
  userId?: string;
}

const PostFeed = ({ userId }: Props) => {
  const { data: posts = [] } = usePosts(userId && userId);

  return (
    <>
      {posts.map((post: any) => (
        <PostItem key={post.id} userId={post.userId} post={post} />
      ))}
    </>
  );
};

export default PostFeed;
