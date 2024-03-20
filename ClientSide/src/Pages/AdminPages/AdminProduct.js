import React, { useContext, useEffect, useState } from "react";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import ProductCard from "../../components/AdminComponent/ProductCard";
import { Context } from "../../Redux/Context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function AdminProduct() {
  const { user, productData } = useContext(Context);

  const navigator = useNavigate();

  useEffect(() => {
    user?.userRole !== "admin" && navigator("/admin");
  });
  return (
    <>
      <nav className="px-[2rem] max-sm:px-[1rem] py-[1rem]  flex justify-between flex-row-reverse max-sm:flex-col max-sm:gap-[1rem]">
        <div className="self-end cursor-pointer h-[2.4rem] w-[11rem] flex  justify-center items-center gap-[.6rem] rounded-[.4rem] text-[1.1rem]  tracking-[1px] font-normal bg-black text-white">
          <FaPlus className="text-[1.2rem] text-white " />
          <Link to="add">
            <h2>Add Product</h2>
          </Link>
        </div>
        <div className="flex gap-[1rem]">
          <input
            placeholder="Search Product"
            type="text"
            className="px-[.8rem] h-[2.4rem] max-sm:w-full w-[25rem] border-[2px] rounded-[.4rem] text-[1.2rem] border-black/70 focus:border-black focus:border-[2.4px] placeholder:text-black/70"
          />
          <div className="cursor-pointer h-[2.4rem] w-[8rem] flex justify-center items-center gap-[.6rem] rounded-[.4rem] text-[1.1rem]  tracking-[1px] font-normal bg-black text-white">
            <FaMagnifyingGlass className="text-[1rem] text-white " /> Search
          </div>
        </div>
      </nav>

      <main className="px-[1.6rem] pt-[1.4rem] pb-[2rem] flex flex-col gap-[1.2rem]">
        {productData?.map((data, index) => (
          <ProductCard key={index} ProductData={data} />
        ))}
      </main>
    </>
  );
}

export default AdminProduct;
