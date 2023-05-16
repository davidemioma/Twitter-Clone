import React from "react";
import Container from "./Container";
import Sidebar from "./sidebar/Sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-black h-screen w-screen">
      <Container>
        <Sidebar />

        <div className="col-span-3 md:col-span-2 border-x border-neutral-800">
          {children}
        </div>
      </Container>
    </div>
  );
};

export default Layout;
