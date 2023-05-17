import React from "react";
import Head from "next/head";
import Header from "@/components/Header";

const Home = () => {
  return (
    <>
      <Head>
        <title>Twitter</title>

        <link rel="icon" href="/assets/twitter.png" />
      </Head>

      <Header label="Home" />
    </>
  );
};

export default Home;
