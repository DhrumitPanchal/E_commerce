import React, { lazy, Suspense, useContext, useEffect } from "react";
import { Context } from "../Redux/Context";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const ProductCard = lazy(() => import("../components/ProductCard"));

function HomePage() {
  const { user, productData } = useContext(Context);

  return (
    <>
      <section className="bg-red-100 h-[calc(100vh-3.5rem)] max-sm:h-fit w-full">
        <img
          src="https://img.freepik.com/free-photo/photocomposition-horizontal-online-shopping-banner_23-2151201771.jpg?w=1060&t=st=1709046640~exp=1709047240~hmac=d9ab76cfbca0bb544a94d6de81cd650a4f203e052212919b717e6b9dbcf1bef2"
          alt=""
          className="w-full h-full max-sm:h-fit"
        />
      </section>

      <section className="py-[3rem] flex items-center flex-col">
        <h2 className="text-[1.8rem] font-semibold">
          Best Seller<span className="font-normal">Products</span>
        </h2>
        {/* --------------- products -------------------------- */}

        <div className=" mt-[3rem] flex justify-center flex-wrap gap-[3rem] max-sm:gap-[1rem] ">
          <Suspense fallback={<Loading />}>
            {productData?.map((e, index) => (
              <ProductCard key={index} data={e} />
            ))}
          </Suspense>
        </div>
      </section>

      {/* -------------- poster ------------------- */}

      <section className="mt-[2rem] mb-[4rem] px-[6rem] max-sm:px-[1.2rem] py-[2rem] flex flex-col items-center">
        <h2 className="text-[1.8rem] font-semibold">Blockbuster deals</h2>
        <div className="mt-[3rem] h-fit w-full flex flex-col gap-[1.2rem]">
          <div className="h-[22rem] max-sm:h-fit  w-full bg-black/10">
            <img
              src="https://img.freepik.com/free-vector/beautiful-happy-diwali-festival-sale-banner_1017-21236.jpg?w=1380&t=st=1705506481~exp=1705507081~hmac=df6156f85c5db8374e1255d6d8a85193c9f7ed956eabd0ea7543be0b4deb6ebf"
              alt=""
              className="w-full h-full"
            />
          </div>

          <div className="flex max-sm:flex-col gap-[1.2rem]">
            <div className="h-[22rem] max-sm:h-fit max-sm:min-h-[14rem] w-full bg-black/10">
              <img
                src="https://img.freepik.com/premium-vector/flash-sale-banner-template-special-offer-big-sales_110633-460.jpg?size=626&ext=jpg&ga=GA1.1.2119793234.1705506469&semt=ais"
                alt=""
                className="w-full h-full"
              />
            </div>
            <div className="h-[22rem] max-sm:h-fit max-sm:min-h-[14rem] w-full bg-black/10">
              <img
                src="https://img.freepik.com/free-vector/mega-sale-offers-banner-template_1017-31299.jpg?size=626&ext=jpg&ga=GA1.1.2119793234.1705506469&semt=ais"
                alt=""
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
