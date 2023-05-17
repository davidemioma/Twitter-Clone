import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-20 h-20 rounded-full border-t border-l border-[lightblue] animate-spin" />
    </div>
  );
};

export default Loader;
