import React from "react";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";

interface Props {
  label: string;
  showBackArrow?: boolean;
}

const Header = ({ label, showBackArrow }: Props) => {
  const router = useRouter();

  return (
    <header className="border-b border-neutral-800 p-5">
      <div className="flex items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            className="cursor-pointer transition hover:opacity-70"
            size={20}
            color="#fff"
            onClick={() => router.back()}
          />
        )}

        <h1 className="font-semibold">{label}</h1>
      </div>
    </header>
  );
};

export default Header;
