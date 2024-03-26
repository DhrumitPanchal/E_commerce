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

  function handleSubmit(e) {
    e.preventDefault();
    handelAdminAccess(formData.email, formData.password);
  }

  return (
    <section className="flex items-center justify-center w-full h-screen select-none ">
      <div className="p-[4rem] max-sm:p-[2rem] w-[30rem] max-sm:mx-[2rem] max-sm:w-full rounded-[1rem] bg-black">
        <h2 className="mb-[1rem] text-white text-[1.6rem] font-semibold">
          Admin Authorization
        </h2>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="mt-[2rem] flex flex-col gap-[1.2rem]"
        >
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
            type="submit"
            className="cursor-pointer mt-[1rem] flex justify-center items-center h-[2.4rem] w-[8rem] rounded-[.3rem] text-[1.2rem] font-bold  transition-colors duration-300 bg-white text-black"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
