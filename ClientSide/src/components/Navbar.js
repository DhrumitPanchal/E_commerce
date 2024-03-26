import React, { useState, useContext } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { BsBox2 } from "react-icons/bs";

import {
  FaShoppingBag,
  FaRegHeart,
  FaUser,
  FaHome,
  FaBox,
} from "react-icons/fa";
import Cookies from "js-cookie";
import { Context } from "../Redux/Context";
function Navbar() {
  const { user, handleLikedProducts, productData } = useContext(Context);
  const [isLogdin, setIsLogdin] = useState(true);
  const [menu, setMenu] = useState(false);
  const navigator = useNavigate();
  let { pathname } = useLocation();
  let isAdminPath = pathname.slice(1, 6);
  if (isAdminPath === "admin") return;
  if (isAdminPath === "login") return;
  isAdminPath = pathname.slice(1, 9);
  if (isAdminPath === "register") return;

  function logout() {
    Cookies.remove("accessToken");
    setMenu(!menu);
    return navigator("/login");
  }
  return (
    <>
      <nav
        id="navbar"
        className="relative z-50 px-[2.4rem] h-[3.5rem] max-sm:px-[1rem] flex justify-between items-center border-b-[1px] border-black bg-white"
      >
        <Link to="/" className="cursor-pointer text-[1.3rem] font-semibold">
          ShopNest
        </Link>
        <ul className="max-sm:hidden max-sm:z-0 max-sm:absolute max-sm:top-0 max-sm:left-0 flex justify-between items-center gap-[1rem] max-sm:gap-[.2rem]">
          <NavLink
            to="/"
            className="z-40 cursor-pointer px-[.8rem] py-[.4rem] font-medium transition-colors duration-300 text-black/70 hover:font-bold hover:text-black h-full "
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className="z-40 cursor-pointer px-[.8rem] py-[.4rem] font-medium transition-colors duration-300 text-black/70 hover:font-bold hover:text-black h-full"
          >
            Products
          </NavLink>
        </ul>
        <div className="flex items-center  gap-[.4rem] max-sm:gap-[.2rem]">
          <Link className="z-40 max-sm:block hidden p-[.8rem] " to="/">
            <GoHome className="cursor-pointer text-[1.6rem]" />
          </Link>

          <Link className="z-40  max-sm:block hidden p-[.8rem] " to="/products">
            <BsBox2 className="cursor-pointer text-[1.6rem]" />
          </Link>

          <Link className="z-40 p-[.8rem] " to="/Likedproducts">
            <FaRegHeart className="cursor-pointer text-[1.6rem]" />
          </Link>

          <Link className="relative z-40 p-[.8rem] " to="/cart">
            {user.cartProducts.length > 0 && (
              <div className="absolute flex justify-center items-center text-[.8rem] top-[1rem] right-[.6rem] h-[1.2rem] w-[1.2rem] rounded-full  text-white bg-black">
                {user.cartProducts.length}
              </div>
            )}
            <HiOutlineShoppingBag className="cursor-pointer text-[2rem]" />
          </Link>

          {!isLogdin ? (
            <Link
              to="login"
              onClick={() => setIsLogdin(!isLogdin)}
              className="z-40 ml-[.8rem]  cursor-pointer px-[1rem] py-[.3rem] rounded-[.4rem] transition-colors duration-300 bg-black hover:bg-black/80  text-white"
            >
              Login
            </Link>
          ) : (
            <div onClick={() => setMenu(!menu)} className="z-40 p-[.8rem] ">
              <FaRegUser className=" text-[1.6rem]" />
            </div>
          )}
        </div>
      </nav>

      {menu && (
        <div className="z-50 px-[1rem] py-[.8rem] absolute top-[3.4rem] right-[2.4rem] rounded-[.4rem]  w-[10rem] text-[1.2rem] before:content-[''] before:absolute before:-top-[.5rem] before:right-[1rem] before:z-10  before:h-[1rem] before:rotate-[-45deg] before:w-[1rem] before:bg-white font-medium text-black/50 bg-white shadow-[0px_1.2px_3px_1px_rgba(0,0,0,0.4)] before:shadow-[1px_-1px_.8px_.1px_rgba(0,0,0,0.2)]">
          <Link to="profile">
            <h2
              onClick={() => setMenu(!menu)}
              className="w-full text-black transition-colors duration-300 "
            >
              Profile
            </h2>
          </Link>
          {user.userRole === "admin" && (
            <Link to="admin/order">
              <h2
                onClick={() => setMenu(!menu)}
                className="w-full text-black transition-colors duration-300 "
              >
                Admin
              </h2>
            </Link>
          )}
          <Link>
            <h2
              onClick={() => logout()}
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
