import React, { useContext } from "react";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import ProductCard from "../../components/AdminComponent/ProductCard";
import { Context } from "../../Redux/Context";
import { Link, NavLink } from "react-router-dom";
function AdminProduct() {
  const { user, setUser, productData, setProductData } = useContext(Context);
  return (
    <>
      <nav className="px-[2rem] max-sm:px-[1rem] py-[1rem]  flex justify-between">
        <div className="flex gap-[1.4rem]">
          <input
            placeholder="Search Product"
            type="text"
            className="px-[.8rem] h-[2.4rem] w-[25rem] border-[2px] rounded-[.4rem] text-[1.2rem] border-black/70 focus:border-black focus:border-[2.4px] placeholder:text-black/70"
          />
          <div className="cursor-pointer h-[2.4rem] w-[8rem] flex justify-center items-center gap-[.6rem] rounded-[.4rem] text-[1.1rem]  tracking-[1px] font-normal bg-black text-white">
            <FaMagnifyingGlass className="text-[1rem] text-white " /> Search
          </div>
        </div>

        <div className="cursor-pointer h-[2.4rem] w-[11rem] flex justify-center items-center gap-[.6rem] rounded-[.4rem] text-[1.1rem]  tracking-[1px] font-normal bg-black text-white">
          <FaPlus className="text-[1.2rem] text-white " />
          <Link to="add">
            <h2>Add Product</h2>
          </Link>
        </div>
      </nav>

      <main className="px-[1.6rem] pt-[1.4rem] pb-[2rem] flex flex-col gap-[1.2rem]">
        {productData.map((data, index) => (
          <ProductCard
            key={index}
            Prodata={data}
            quontity={user.cartProducts[index]?.Quontity}
          />
        ))}
      </main>
    </>
  );
}

export default AdminProduct;
