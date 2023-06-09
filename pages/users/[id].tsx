import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import useUser from "@/hooks/useUser";
import Loader from "@/components/Loader";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";
import PostFeed from "@/components/post/PostFeed";

const Profile = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: user, isLoading } = useUser(id as string);

  if (isLoading || !user) return <Loader />;

  return (
    <div className="h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>TwitterClone - @{user.username || ""}</title>

        <link rel="icon" href="/assets/twitter.png" />
      </Head>

      <Header label={user.name} showBackArrow />

      <UserHero userId={id as string} />

      <UserBio userId={id as string} />

      <PostFeed userId={id as string} />
    </div>
  );
};

export default Profile;
