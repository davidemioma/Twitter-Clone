import React from "react";

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <div className="container h-full max-w-6xl mx-auto xl:px-30">
      <div className="grid grid-cols-4 h-full">{children}</div>
    </div>
  );
};

export default Container;
