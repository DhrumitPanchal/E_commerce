import Loder from "../components/Loder";
import Data from "../components/Data";
import { FaMagnifyingGlass } from "react-icons/fa6";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

function ProductsPage() {
  const [priceRange, setPriceRange] = useState(250); // Initial value of 50

  // Handle change in price range
  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
  };
  return (
    <>
      <section className="px-[2rem] max-sm:px-[1rem] py-[1rem]  flex gap-[1.4rem]">
        <input
          placeholder="Search Item"
          type="text"
          className="px-[.8rem] h-[2.4rem] w-[25rem] border-[2px] rounded-[.4rem] text-[1.2rem] border-black/70 focus:border-black focus:border-[2.4px] placeholder:text-black/70"
        />
        <div className="cursor-pointer h-[2.4rem] w-[8rem] flex justify-center items-center gap-[.6rem] rounded-[.4rem] text-[1.1rem]  tracking-[1px] font-normal bg-black text-white">
          <FaMagnifyingGlass className="text-[1rem] text-white " /> Search
        </div>
      </section>
      <section className="mt-[1rem] h-full w-full flex max-sm:flex-col">
        <aside className="ml-[2rem] max-sm:ml-[1rem] px-[1rem] py-[1rem] bg-blue-gray-100/30 w-[18rem] max-sm:w-[calc(100%-2rem)] h-full">
          <h2 className="text-[1.2rem] font-medium">Filters</h2>
          <div className="mt-[1rem] flex flex-col gap-[1rem]">
            <div className="">
              <h2 className="font-bold">Price</h2>
              <h3 className="font-medium">₹250 - ₹{priceRange}</h3>
              <div className="flex gap-[2rem]">
                <input
                  type="range"
                  min="250"
                  max="60000"
                  className="w-full appearance-none bg-transparent [&::-webkit-slider-runnable]:h-[.4rem] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[1.2rem] [&::-webkit-slider-thumb]:w-[1.2rem] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
                  value={priceRange}
                  onChange={handlePriceChange}
                />
                <div className="cursor-pointer px-[.6rem] py-[.2rem] font-medium rounded-[.3rem] bg-black text-white">
                  Go
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-bold">Discount</h2>

              <div className="flex flex-col gap-[.1rem] text-black/70">
                <h3 className="font-medium cursor-pointer hover:text-black">
                  Any Discount
                </h3>
                <h3 className="font-medium cursor-pointer hover:text-black">
                  10% Off or more
                </h3>
                <h3 className="font-medium cursor-pointer hover:text-black">
                  25% Off or more
                </h3>
                <h3 className="font-medium cursor-pointer hover:text-black">
                  35% Off or more
                </h3>
                <h3 className="font-medium cursor-pointer hover:text-black">
                  50% Off or more
                </h3>
                <h3 className="font-medium cursor-pointer hover:text-black">
                  60% Off or more
                </h3>
                <h3 className="font-medium cursor-pointer hover:text-black">
                  70% Off or more
                </h3>
              </div>
            </div>
          </div>
        </aside>
        {/* ----------------- products ------------------ */}
        <div className="max-sm:mt-[4rem] pr-[.8rem] mb-[4rem] max-sm:pr-0 w-[calc(100%-18rem)] min-h-[calc(100vh-3.5rem)] max-sm:w-full flex justify-center flex-wrap gap-[2.5rem]">
          {Data.map((e) => (
            <ProductCard data={e} />
          ))}{" "}
        </div>
      </section>
    </>
  );
}

export default ProductsPage;
