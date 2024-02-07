import React from "react";

function Loading() {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen">
      <div className="loader relative flex justify-center items-center h-[7rem] w-[7rem] rounded-full "></div>
      <div className="loader-content absolute h-[5.8rem] w-[5.8rem] flex justify-center items-center rounded-full bg-white">
        loading...
      </div>
    </div>
  );
}

export default Loading;
