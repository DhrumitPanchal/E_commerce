import React, { lazy, Suspense, useContext, useEffect } from "react";
import { Context } from "../Redux/Context";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const ProductCard = lazy(() => import("../components/ProductCard"));

function HomePage() {
  const { user, productData } = useContext(Context);

  return (
    <>
      <section className="bg-red-100 h-[calc(100vh-3.5rem)] max-sm:h-fit w-full flex">
        <img
          src="https://i.pinimg.com/originals/39/d0/a7/39d0a7e4ee4300d46910b1eb77b388f2.jpg"
          alt=""
          className="w-full h-full max-sm:h-fit"
        />
      </section>

      {/* <section className="p-[1.5rem] max-sm:p-[1rem] flex flex-col w-full h-screen max-sm:h-fit gap-[1.5rem] bg-slate-100">
        <div className="flex max-sm:flex-col max-sm:gap-[1rem] gap-[1.5rem] w-full h-3/5">
          <div className="w-full h-full bg-red-100 ">
            <img
              src="https://i.pinimg.com/564x/7b/c4/3f/7bc43f8561ecedfee36b3d6070361da0.jpg"
              alt=""
              className="w-full h-full max-sm:h-fit "
            />
          </div>
          <div className="w-full h-full bg-red-100 ">
            <img
              src="https://img.freepik.com/free-photo/photocomposition-horizontal-online-shopping-banner_23-2151201771.jpg?w=1060&t=st=1709046640~exp=1709047240~hmac=d9ab76cfbca0bb544a94d6de81cd650a4f203e052212919b717e6b9dbcf1bef2"
              alt=""
              className="w-full h-full max-sm:h-fit"
            />
          </div>
        </div>
        <div className="max-sm:hidden flex max-sm:flex-col max-sm:gap-[1rem] gap-[1.5rem] w-full  h-2/5">
          <div className="w-full h-full bg-red-100 ">
            <img
              src="https://img.freepik.com/free-photo/photocomposition-horizontal-online-shopping-banner_23-2151201771.jpg?w=1060&t=st=1709046640~exp=1709047240~hmac=d9ab76cfbca0bb544a94d6de81cd650a4f203e052212919b717e6b9dbcf1bef2"
              alt=""
              className="w-full h-full max-sm:h-fit"
            />
          </div>
          <div className="w-full h-full bg-red-100 ">
            <img
              src="https://img.freepik.com/free-photo/photocomposition-horizontal-online-shopping-banner_23-2151201771.jpg?w=1060&t=st=1709046640~exp=1709047240~hmac=d9ab76cfbca0bb544a94d6de81cd650a4f203e052212919b717e6b9dbcf1bef2"
              alt=""
              className="w-full h-full max-sm:h-fit"
            />
          </div>
          <div className="w-full h-full bg-red-100 ">
            <img
              src="https://img.freepik.com/free-photo/photocomposition-horizontal-online-shopping-banner_23-2151201771.jpg?w=1060&t=st=1709046640~exp=1709047240~hmac=d9ab76cfbca0bb544a94d6de81cd650a4f203e052212919b717e6b9dbcf1bef2"
              alt=""
              className="w-full h-full max-sm:h-fit"
            />
          </div>
        </div>
      </section> */}

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
    </>
  );
}

export default HomePage;
