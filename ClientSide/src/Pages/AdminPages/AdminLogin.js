import React, { useState, useContext } from "react";
import { Context } from "../../Redux/Context";
function AdminLogin() {
  const { handelAdminAccess } = useContext(Context);

  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <section className="flex items-center justify-center w-full h-screen select-none ">
      <div className="p-[4rem] w-[30rem] rounded-[1rem] bg-black">
        <h2 className="mb-[1rem] text-white text-[1.6rem] font-semibold">
          Admin Authorization
        </h2>

        <div className="mt-[2rem] flex flex-col gap-[1.2rem]">
          <input
            name="email"
            onChange={(e) => handleInput(e)}
            value={formData.email}
            type="email"
            required
            className=" px-[1rem] py-[.2rem] w-full rounded-[.4rem] border-[2px] font-normal text-[1.2rem] text-white border-white/20 placeholder:text-white/50 focus:border-white/50 bg-transparent "
            placeholder="Email"
          />
          <input
            name="password"
            onChange={(e) => handleInput(e)}
            value={formData.password}
            type="password"
            required
            className="px-[1rem] py-[.2rem] w-full rounded-[.4rem] border-[2px] font-normal text-[1.2rem] text-white border-white/20 placeholder:text-white/50 focus:border-white/50 bg-transparent "
            placeholder="Password"
          />

          <button
            onClick={() => handelAdminAccess(formData.email, formData.password)}
            className="cursor-pointer mt-[1rem] flex justify-center items-center h-[2.4rem] w-[8rem] rounded-[.3rem] text-[1.2rem] font-bold  transition-colors duration-300 bg-white/60 text-black hover:bg-white"
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
