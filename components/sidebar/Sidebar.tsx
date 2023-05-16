import React from "react";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetBtn from "./SidebarTweetBtn";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { BsHouseFill, BsBellFill } from "react-icons/bs";

const Sidebar = () => {
  const currentUser = null;

  const items = [
    {
      icon: BsHouseFill,
      label: "Home",
      href: "/",
    },
    {
      icon: BsBellFill,
      label: "Notifications",
      href: "/notifications",
      auth: true,
      alert: false,
    },
    {
      icon: FaUser,
      label: "Profile",
      href: `/users/currentUser?.id`,
      auth: true,
    },
  ];

  return (
    <div className="col-sapn-1 h-full pr-4 md:pr-6">
      <div className="lg:w-[230px] flex justify-end">
        <div className="flex flex-col gap-2">
          <SidebarLogo />

          {items.map((item) => (
            <SidebarItem
              key={item.label}
              Icon={item.icon}
              label={item.label}
              href={item.href}
              auth={item.auth}
              alert={item.alert}
            />
          ))}

          <SidebarItem Icon={BiLogOut} label="Logout" onClick={() => {}} />

          <SidebarTweetBtn />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
