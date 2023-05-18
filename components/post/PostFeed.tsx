import React from "react";
import PostItem from "./PostItem";
import { Post } from "@prisma/client";
import usePosts from "@/hooks/usePosts";
import EmptyState from "../EmptyState";

interface Props {
  userId?: string;
}

const PostFeed = ({ userId }: Props) => {
  const { data: posts = [] } = usePosts(userId as string);

  if (posts.length === 0) return <EmptyState label="No posts available" />;

  return (
    <>
      {posts.map((post: any) => (
        <PostItem key={post.id} userId={post.userId} post={post} />
      ))}
    </>
  );
};

export default PostFeed;
