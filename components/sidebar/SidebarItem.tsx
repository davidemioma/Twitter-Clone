import React from "react";
import { IconType } from "react-icons";

interface Props {
  Icon: IconType;
  label: string;
  href?: string;
  auth?: boolean;
  alert?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ Icon, label, href, auth, alert, onClick }: Props) => {
  return (
    <div className="flex items-center" onClick={() => onClick}>
      <div className="relative flex items-center justify-center w-14 h-14 p-4 rounded-full cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition lg:hidden">
        <Icon size={28} color="#fff" />
      </div>

      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition">
        <Icon size={24} color="#fff" />

        <p>{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
