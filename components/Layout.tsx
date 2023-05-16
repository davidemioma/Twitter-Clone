import React from "react";
import Container from "./Container";
import Sidebar from "./sidebar/Sidebar";
import Widget from "./Widget";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-black h-screen w-screen">
      <Container>
        <Sidebar />

        <div className="col-span-3 lg:col-span-2 border-x border-neutral-800">
          {children}
        </div>

        <Widget />
      </Container>
    </div>
  );
};

export default Layout;
