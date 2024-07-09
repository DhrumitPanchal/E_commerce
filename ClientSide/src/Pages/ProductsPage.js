import { FaMagnifyingGlass } from "react-icons/fa6";
import ProductCard from "../components/ProductCard";
import { useState, useContext, useEffect } from "react";
import { Context } from "../Redux/Context";
import { useNavigate } from "react-router-dom";
function ProductsPage() {
  const [priceRange, setPriceRange] = useState(250); // Initial value of 50
  const { user, productData } = useContext(Context);
  const [filterIsActive, setFilterIsActive] = useState(false);
  const [filtProducts, setFiltProducts] = useState([]);
  const [search, setSearch] = useState("");
  // Handle change in price range
  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
  };

  const handelPriceRangeFilter = () => {
    setFilterIsActive(true);
    const result = productData.filter(
      (product) => product?.product_price <= priceRange
    );
    console.log(result);
    setFiltProducts(result);
  };

  const handelDiscountRageFilter = (discRate) => {
    setFilterIsActive(true);
    const result = productData.filter(
      (product) => product?.discount_rate >= discRate
    );
    console.log(result);
    setFiltProducts(result);
  };

  const hamdelResatFilter = () => {
    setFilterIsActive(false);
    setFiltProducts([]);
  };

  const handelSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const handelSearchProducts = () => {
    if (search) {
      setFilterIsActive(true);
    }
    const lowerserch = search.toLowerCase();
    const result = productData.filter((product) => {
      if (product.product_name.toLowerCase().includes(lowerserch))
        return priceRange;
    });

    setFiltProducts(result);
  };

  const navigator = useNavigate();

  return (
    <>
      <section className="px-[2rem] max-sm:px-[1rem] py-[1rem] flex gap-[1.4rem]">
        <input
          onChange={(e) => handelSearch(e)}
          value={search}
          placeholder="Search Item"
          type="text"
          className="px-[.8rem] h-[2.4rem] w-[25rem] border-[1.4px] text-[1rem]  border-black/70 focus:border-black  placeholder:text-black/70 placeholder:font-normal"
        />
        <div
          onClick={() => handelSearchProducts()}
          className="cursor-pointer h-[2.4rem] w-[8rem] flex justify-center items-center gap-[.6rem]  text-[1.1rem]  tracking-[1px] font-normal bg-black text-white"
        >
          <FaMagnifyingGlass className="text-[1rem] text-white " /> Search
        </div>
      </section>
      <section className="mt-[1rem] h-full w-full flex max-sm:flex-col">
        <aside className="ml-[2rem] max-sm:ml-[1rem] px-[1rem] py-[1rem] w-[22rem] max-sm:w-[calc(100%-2rem)] h-full">
          <h2 className="text-[1.2rem] font-medium">Filters</h2>
          <div className="mt-[1rem] flex flex-col gap-[1rem]">
            <div className="">
              <h2 className="font-bold">Price</h2>
              <h3 className="font-medium">₹250 - ₹{priceRange}</h3>
              <div className="flex gap-[2rem]">
                <input
                  type="range"
                  min="250"
                  max="10000"
                  className="w-full appearance-none bg-transparent [&::-webkit-slider-runnable]:h-[.4rem] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[1.2rem] [&::-webkit-slider-thumb]:w-[1.2rem] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
                  value={priceRange}
                  onChange={handlePriceChange}
                />
                <div
                  onClick={() => handelPriceRangeFilter()}
                  className="cursor-pointer px-[.6rem] py-[.2rem] font-medium rounded-[.3rem] bg-black text-white"
                >
                  Go
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-bold">Discount</h2>

              <div className="flex flex-col gap-[.1rem] text-black/70">
                <h3
                  onClick={() => handelDiscountRageFilter(1)}
                  className="font-medium cursor-pointer hover:text-black"
                >
                  Any Discount
                </h3>
                <h3
                  onClick={() => handelDiscountRageFilter(10)}
                  className="font-medium cursor-pointer hover:text-black"
                >
                  10% Off or more
                </h3>
                <h3
                  onClick={() => handelDiscountRageFilter(25)}
                  className="font-medium cursor-pointer hover:text-black"
                >
                  25% Off or more
                </h3>
                <h3
                  onClick={() => handelDiscountRageFilter(35)}
                  className="font-medium cursor-pointer hover:text-black"
                >
                  35% Off or more
                </h3>
                <h3
                  onClick={() => handelDiscountRageFilter(50)}
                  className="font-medium cursor-pointer hover:text-black"
                >
                  50% Off or more
                </h3>
                <h3
                  onClick={() => handelDiscountRageFilter(60)}
                  className="font-medium cursor-pointer hover:text-black"
                >
                  60% Off or more
                </h3>
                <h3
                  onClick={() => handelDiscountRageFilter(70)}
                  className="font-medium cursor-pointer hover:text-black"
                >
                  70% Off or more
                </h3>
              </div>
            </div>

            <div
              onClick={() => hamdelResatFilter()}
              className="cursor-pointer h-[2.2rem] w-[7rem] rounded-[.4rem] flex justify-center items-center bg-black text-white"
            >
              Resat filter
            </div>
          </div>
        </aside>
        {/* ----------------- products ------------------ */}
        <div className="mb-[4rem] flex justify-center w-[calc(100%-22rem)] max-sm:w-full max-sm:mt-[3rem]  px-[1rem] flex-wrap gap-[2.2rem] min-h-[calc(100vh-3.5rem)] max-sm:min-h-fit max-sm:gap-[1rem] ">
          {filterIsActive
            ? filtProducts?.map((e) => <ProductCard key={e._id} data={e} />)
            : productData?.map((e) => <ProductCard key={e._id} data={e} />)}
        </div>
      </section>
    </>
  );
}

export default ProductsPage;
