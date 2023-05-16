import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

interface Props {
  Icon: IconType;
  label: string;
  href?: string;
  auth?: boolean;
  alert?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ Icon, label, href, auth, alert, onClick }: Props) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) return onClick();

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, loginModal, auth, currentUser]);

  return (
    <div className="flex items-center" onClick={handleClick}>
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
