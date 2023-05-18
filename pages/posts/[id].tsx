import React from "react";
import Head from "next/head";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import PostItem from "@/components/post/PostItem";
import Form from "@/components/Form";

const Post = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: post, isLoading } = usePost(id as string);

  if (isLoading || !post) return <Loader />;

  return (
    <>
      <Head>
        <title>Twitter - post</title>

        <link rel="icon" href="/assets/twitter.png" />
      </Head>

      <Header label="Tweet" showBackArrow />

      <PostItem post={post} />

      <Form postId={id as string} isComment placeholder="Tweet your reply" />
    </>
  );
};

export default Post;
