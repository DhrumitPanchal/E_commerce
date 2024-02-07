import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FaShoppingBag, FaHeart, FaUser } from "react-icons/fa";

function Navbar() {
  const [isLogdin, setIsLogdin] = useState(true);
  const [menu, setMenu] = useState(false);
  let { pathname } = useLocation();
  let isAdminPath = pathname.slice(1, 6);
  if (isAdminPath === "admin") return;
  return (
    <>
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
        <div className="flex items-center  gap-[.4rem] ">
          <Link className="p-[.8rem] " to="/Likedproducts">
            <FaHeart className="cursor-pointer text-[1.6rem]" />
          </Link>

          <Link className="p-[.8rem] " to="/cart">
            <FaShoppingBag className="cursor-pointer text-[1.6rem]" />
          </Link>

          {!isLogdin ? (
            <Link
              to="login"
              onClick={() => setIsLogdin(!isLogdin)}
              className="ml-[.8rem]  cursor-pointer px-[1rem] py-[.3rem] rounded-[.4rem] transition-colors duration-300 bg-black hover:bg-black/80  text-white"
            >
              Login
            </Link>
          ) : (
            <div onClick={() => setMenu(!menu)} className="p-[.8rem] ">
              <FaUser className=" text-[1.6rem]" />
            </div>
          )}
        </div>
      </nav>

      {menu && (
        <div className="z-20 px-[1rem] py-[.8rem] absolute top-[3.4rem] right-[2.4rem] rounded-[.4rem]  w-[10rem] text-[1.2rem] before:content-[''] before:absolute before:-top-[.5rem] before:right-[1rem] before:z-10  before:h-[1rem] before:rotate-[-45deg] before:w-[1rem] before:bg-white font-medium text-black/50 bg-white shadow-[0px_1.2px_3px_1px_rgba(0,0,0,0.4)] before:shadow-[1px_-1px_.8px_.1px_rgba(0,0,0,0.2)]">
          <Link to="profile">
            <h2
              onClick={() => setMenu(!menu)}
              className="w-full text-black transition-colors duration-300 "
            >
              Profile
            </h2>
          </Link>
          <Link to="admin/order">
            <h2
              onClick={() => setMenu(!menu)}
              className="w-full text-black transition-colors duration-300 "
            >
              Admin
            </h2>
          </Link>
          <Link>
            <h2
              onClick={() => setMenu(!menu)}
              className="w-full text-black transition-colors duration-300 "
            >
              Log Out
            </h2>
          </Link>
        </div>
      )}
    </>
  );
}

export default Navbar;
