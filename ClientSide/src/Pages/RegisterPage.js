import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Redux/Context";
function RegisterPage() {
  const { handelSignUp } = useContext(Context);
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-white">
      <div className="flex items-center justify-center w-1/2 max-sm:hidden">
        <img alt="" src="./Images/20824341_6368590.svg" className="h-[40rem]" />
      </div>

      <div className="px-[5rem] max-sm:px-[2rem] flex items-center justify-center flex-col gap-[1rem] w-1/2 max-sm:w-full h-full bg-[#f0f0ff] ">
        <div className="p-[4rem] max-sm:p-[2rem] max-sm:mx-[1rem] flex gap-[1rem] w-[30rem] max-sm:w-full flex-col rounded-[2rem] bg-white">
          <h2 className="mb-[1rem] text-[#6060e3] text-[1.8rem] font-semibold">
            Register
          </h2>
          <input
            name="name"
            onChange={(e) => handleInput(e)}
            value={formData.name}
            type="text"
            className="px-[1rem] py-[.2rem] w-full rounded-[.4rem] border-[2px] font-normal text-[1.2rem] border-blue-700/40 focus:border-[#6060e3] placeholder:text-black/60"
            placeholder="Full Name"
          />
          <input
            name="email"
            onChange={(e) => handleInput(e)}
            value={formData.email}
            type="text"
            className="px-[1rem] py-[.2rem] w-full rounded-[.4rem] border-[2px] font-normal text-[1.2rem] border-blue-700/40 focus:border-[#6060e3] placeholder:text-black/60"
            placeholder="Email"
          />
          <input
            name="password"
            onChange={(e) => handleInput(e)}
            value={formData.password}
            type="text"
            className="px-[1rem] py-[.2rem] w-full rounded-[.4rem] border-[2px] font-normal text-[1.2rem] border-blue-700/40 focus:border-[#6060e3] placeholder:text-black/60"
            placeholder="Password"
          />

          <div
            onClick={() => handelSignUp(formData)}
            className="cursor-pointer mt-[1rem] flex justify-center items-center h-[2.4rem] w-[8rem] rounded-[.8rem] text-[1.2rem] font-semibold  transition-colors duration-300 bg-blue-500/20 text-blue-700 hover:bg-[#6060e3] hover:text-white "
          >
            Register
          </div>

          <div className="cursor-pointer mt-[.6rem] px-[1rem] py-[.4rem] flex  justify-center items-center gap-[1rem] rounded-[.4rem] border-[2px] border-blue-700/40 transition-colors duration-300  hover:bg-blue-500/20 ">
            <h2 className="text-[1.2rem] font-semibold">Google</h2>
          </div>
          <h2>
            If You Have already account ?
            <Link to={"/login"} className="ml-[.6rem] text-blue-500">
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
