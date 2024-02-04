import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FaShoppingBag, FaHeart, FaUser } from "react-icons/fa";

function Navebar() {
  const [isLogdin, setIsLogdin] = useState(true);
  let { pathname } = useLocation();
  let isAdminPath = pathname.slice(1, 6);
  if (isAdminPath === "admin") return;
  return (
    <nav className=" z-50 px-[2.4rem] h-[3.5rem] max-sm:px-[1rem] flex justify-between items-center border-b-[1px] border-black bg-white">
      <Link to="/" className="cursor-pointer text-[1.3rem] font-semibold">
        ShopNest
      </Link>
      <ul className="max-sm:z-0 max-sm:absolute max-sm:top-0 max-sm:left-0 flex justify-between items-center gap-[1rem] max-sm:gap-[.2rem]">
        <NavLink
          to="/"
          className="cursor-pointer px-[.8rem] py-[.4rem] font-medium transition-colors duration-300 text-black/70 hover:font-bold hover:text-black h-full "
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className="cursor-pointer px-[.8rem] py-[.4rem] font-medium transition-colors duration-300 text-black/70 hover:font-bold hover:text-black h-full"
        >
          Products
        </NavLink>
      </ul>
      <div className="flex items-center  gap-[1.8rem] ">
        <Link Link to="/Likedproducts">
          <FaHeart className="cursor-pointer text-[1.4rem]" />
        </Link>

        <Link Link to="/cart">
          <FaShoppingBag className="cursor-pointer text-[1.4rem]" />
        </Link>

        {!isLogdin ? (
          <Link
            to="login"
            onClick={() => setIsLogdin(!isLogdin)}
            className="cursor-pointer px-[1rem] py-[.3rem] rounded-[.4rem] transition-colors duration-300 bg-black hover:bg-black/80  text-white"
          >
            Login
          </Link>
        ) : (
          <Link to="/profile">
            <FaUser className="text-[1.4rem]" />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navebar;
