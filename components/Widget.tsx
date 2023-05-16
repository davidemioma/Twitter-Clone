import React from "react";

const Widget = () => {
  return (
    <div className="hidden lg:block px-6 py-4">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="font-semibold">Who to follow</h2>

        <div className="flex flex-col gap-6 mt-4">{/* Todo Users Lists */}</div>
      </div>
    </div>
  );
};

export default Widget;
