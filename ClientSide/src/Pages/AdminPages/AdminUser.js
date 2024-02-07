import React from "react";
import { FaCross, FaRegTrashAlt } from "react-icons/fa";

function AdminUser() {
  const users = [
    {
      name: "dhrumit",
      email: "dhrumit@gmail.com",
    },
    {
      name: "poojan",
      email: "poojan54@gmail.com",
    },
    {
      name: "vraj",
      email: "vraj67@gmail.com",
    },
    {
      name: "dhrumit",
      email: "dhrumit@gmail.com",
    },
  ];
  return (
    <main className="px-[1.6rem] pt-[1.4rem] pb-[2rem] flex flex-col gap-[1.2rem]">
      {users?.map((element) => (
        <div className=" px-[1.6rem] py-[.6rem] flex items-center w-full h-fit rounded-[.6rem]  shadow-[0px_1px_2px_.8px_rgba(0,0,0,0.2)]">
          <div className="flex items-center w-full  h-full gap-[2rem]">
            <h2 className="text-[1.2rem] w-[20rem]  font-semibold">
              {element.name}
            </h2>
            <h3 className="text-[1.2rem]">{element.email}</h3>
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
