import React, { lazy } from "react";

import { NavLink } from "react-router-dom";
import AddProduct from "./AddProduct";
const AdminOrder = lazy(() => import("./AdminOrder"));
const AdminProduct = lazy(() => import("./AdminProduct"));
const AdminGraph = lazy(() => import("./AdminGraph"));
const AdminUser = lazy(() => import("./AdminUser"));
function AdminPage({ Path }) {
  console.log(Path);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <aside className=" flex flex-col min-h-[calc(100vh-3.5rem)] w-[15rem] bg-blue-gray-100/30">
        <NavLink
          to={"/admin/order"}
          className="cursor-pointer px-[1rem] py-[.6rem] h-fit w-full border-b-[1px] border-black/50 text-[1.2rem] transition-colors duration-300 text-black/50 font-bold hover:bg-black/10"
        >
          Orders
        </NavLink>
        <NavLink
          to={"/admin/products"}
          className="cursor-pointer px-[1rem] py-[.6rem] h-fit w-full border-b-[1px] border-black/50 text-[1.2rem] transition-colors duration-300 text-black/50 font-bold hover:bg-black/10"
        >
          Products
        </NavLink>
        <NavLink
          to={"/admin/user"}
          className="cursor-pointer px-[1rem] py-[.6rem] h-fit w-full border-b-[1px] border-black/50 text-[1.2rem] transition-colors duration-300 text-black/50 font-bold hover:bg-black/10"
        >
          User
        </NavLink>
        <NavLink
          to={"/admin/graphs"}
          className="cursor-pointer px-[1rem] py-[.6rem] h-fit w-full border-b-[1px] border-black/50 text-[1.2rem] transition-colors duration-300 text-black/50 font-bold hover:bg-black/10"
        >
          graphs
        </NavLink>
      </aside>

      <section className="min-h-[calc(100vh-3.5rem)] w-full">
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
