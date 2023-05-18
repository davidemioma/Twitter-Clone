import React, { useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Feed from "@/components/notification/Feed";
import useCurrentUser from "@/hooks/useCurrentUser";

const Notifications = () => {
  const { mutate: mutateCurrentUser } = useCurrentUser();

  useEffect(() => {
    mutateCurrentUser();
  }, []);

  return (
    <div className="h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>TwitterClone</title>

        <link rel="icon" href="/assets/twitter.png" />
      </Head>

      <Header label="Notifications" showBackArrow />

      <Feed />
    </div>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Notifications;
