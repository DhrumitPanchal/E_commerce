import React from "react";

function Loder() {
  return (
    <div className="fixed flex justify-center items-center z-50 top-0 left-0 h-screen w-full">
      <div className="loder relative flex justify-center items-center h-[7rem] w-[7rem] rounded-full "></div>
      <div className="loder-content absolute h-[5.8rem] w-[5.8rem] flex justify-center items-center rounded-full bg-white">
        loding...
      </div>
    </div>
  );
}

export default Loder;
