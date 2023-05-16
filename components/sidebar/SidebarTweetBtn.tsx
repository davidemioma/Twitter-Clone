import React from "react";
import { useRouter } from "next/router";
import { FaFeather } from "react-icons/fa";

const SidebarTweetBtn = () => {
  const router = useRouter();

  return (
    <div className="cursor-pointer mt-4" onClick={() => router.push("/")}>
      <div className="bg-sky-500 flex items-center justify-center w-14 h-14 p-4 rounded-full transition hover:bg-opacity-80 lg:hidden">
        <FaFeather size={24} color="#fff" />
      </div>

      <div className="hidden lg:block bg-sky-500 px-4 py-2 rounded-full transition hover:bg-opacity-90">
        <p className="text-center font-semibold">Tweet</p>
      </div>
    </div>
  );
};

export default SidebarTweetBtn;
