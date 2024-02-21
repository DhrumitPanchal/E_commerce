import React, { useContext, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Context } from "../../Redux/Context";
function AdminUser() {
  const { allUsers } = useContext(Context);
  return (
    <main className="px-[1.6rem] pt-[1.6rem] max-sm:px-[1rem] max-sm:pt-[4.2rem] pb-[2rem] flex flex-col gap-[1.2rem]">
      {allUsers?.map((item) => (
        <div
          key={item?.email}
          className=" px-[1.6rem] py-[.6rem] flex items-center w-full h-fit rounded-[.6rem]  shadow-[0px_1px_2px_.8px_rgba(0,0,0,0.2)]"
        >
          <div className="flex max-sm:flex-col max-sm:items-start items-center w-full  h-full gap-[2rem] max-sm:gap-0">
            <h2 className="text-[1.2rem] w-[20rem] max-sm:w-fit font-semibold">
              {item?.name}
            </h2>
            <h3 className="text-[1.2rem]">{item?.email}</h3>
          </div>
          <div className="cursor-pointer flex justify-center items-center rounded-[.3rem] h-[2rem] w-[2rem] bg-red-600">
            <FaRegTrashAlt className="text-white" />
          </div>
        </div>
      ))}
    </main>
  );
}

export default AdminUser;
