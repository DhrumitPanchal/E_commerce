import React from "react";

function Loading() {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen">
      <div className="loader relative flex justify-center items-center h-[7rem] w-[7rem] max-sm:h-[5rem] max-sm:w-[5rem] rounded-full "></div>
      <div className="loader-content absolute h-[5.8rem] w-[5.8rem] max-sm:h-[4rem] max-sm:w-[4rem] max-sm:text-[1.2rem] flex justify-center items-center rounded-full bg-white"></div>
    </div>
  );
}

export default Loading;
