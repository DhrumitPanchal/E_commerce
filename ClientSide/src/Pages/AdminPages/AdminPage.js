import React, { lazy, useState } from "react";
import { FaArrowLeft, FaBars, FaTimes } from "react-icons/fa";

import { Link, NavLink } from "react-router-dom";
import AddProduct from "./AddProduct";
const AdminOrder = lazy(() => import("./AdminOrder"));
const AdminProduct = lazy(() => import("./AdminProduct"));
const AdminGraph = lazy(() => import("./AdminGraph"));
const AdminUser = lazy(() => import("./AdminUser"));
function AdminPage({ Path }) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="relative flex w-screen h-screen overflow-x-hidden h-sc">
      <FaBars
        onClick={() => setOpenMenu(!openMenu)}
        className="hidden max-sm:block mt-[.9rem] ml-[1rem]  z-[10] text-[1.8rem]"
      />
      <aside
        className={`${
          openMenu ? " max-sm:left-0" : "max-sm:-left-[15rem]"
        } z-[10] left-0 fixed top-0 flex flex-col h-full w-[15rem] transition-all duration-300 bg-gray-100`}
      >
        <div className="cursor-pointer  flex items-center justify-between gap-[1rem] px-[1rem] py-[.6rem] h-fit w-full border-b-[1px] border-black/50 text-[1.2rem] transition-colors duration-300 text-black font-bold ">
          <FaTimes
            onClick={() => setOpenMenu(!openMenu)}
            className="hidden max-sm:block text-[1.6rem]"
          />
          <Link to={"/"} className="flex items-center gap-[.8rem]">
            <FaArrowLeft /> <h2>Back</h2>
          </Link>
        </div>
        <NavLink
          to={"/admin/order"}
          onClick={() => setOpenMenu(!openMenu)}
          className="cursor-pointer px-[1rem] py-[.6rem] h-fit w-full border-b-[1px] border-black/50 text-[1.2rem] transition-colors duration-300 text-black/50 font-bold hover:bg-black/10"
        >
          Orders
        </NavLink>
        <NavLink
          to={"/admin/products"}
          onClick={() => setOpenMenu(!openMenu)}
          className="cursor-pointer px-[1rem] py-[.6rem] h-fit w-full border-b-[1px] border-black/50 text-[1.2rem] transition-colors duration-300 text-black/50 font-bold hover:bg-black/10"
        >
          Products
        </NavLink>
        <NavLink
          onClick={() => setOpenMenu(!openMenu)}
          to={"/admin/user"}
          className="cursor-pointer px-[1rem] py-[.6rem] h-fit w-full border-b-[1px] border-black/50 text-[1.2rem] transition-colors duration-300 text-black/50 font-bold hover:bg-black/10"
        >
          User
        </NavLink>
        <NavLink
          onClick={() => setOpenMenu(!openMenu)}
          to={"/admin/graphs"}
          className="cursor-pointer px-[1rem] py-[.6rem] h-fit w-full border-b-[1px] border-black/50 text-[1.2rem] transition-colors duration-300 text-black/50 font-bold hover:bg-black/10"
        >
          graphs
        </NavLink>
      </aside>

      <section className="absolute max-sm:left-0 left-[15rem] right-0 min-h-[calc(100vh-3.5rem)] ">
        {Path === "order" && <AdminOrder />}
        {Path === "products" && <AdminProduct />}
        {Path === "AddProducts" && <AddProduct />}
        {Path === "user" && <AdminUser />}
        {Path === "graphs" && <AdminGraph />}
      </section>
    </div>
  );
}

export default AdminPage;
