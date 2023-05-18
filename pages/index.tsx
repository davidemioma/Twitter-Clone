import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Form from "@/components/Form";
import PostFeed from "@/components/post/PostFeed";

const Home = () => {
  return (
    <div className="h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>TwitterClone</title>

        <link rel="icon" href="/assets/twitter.png" />
      </Head>

      <Header label="Home" />

      <Form placeholder="What's happening?" />

      <PostFeed />
    </div>
  );
};

export default Home;
