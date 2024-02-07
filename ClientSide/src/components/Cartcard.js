import React, { useState, useContext, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Context } from "../Redux/Context";

function Cartcard(props) {
  const { ProductData, quantity } = props;
  const [productQuantity, setProductQuantity] = useState(null);
  const { handleAddToCart, handleRemoveFromCart } = useContext(Context);
  useEffect(() => {
    setProductQuantity(quantity);
  }, []);
  return (
    <>
      <div className="h-[8rem] max-sm:h-fit p-[.6rem] flex max-sm:flex-wrap items-center justify-between gap-[2rem] max-sm:gap-[1rem] max-sm:pb-[2rem] rounded-[1rem]  shadow-[0px_2px_4px_1px_rgba(0,0,0,0.2)]">
        <div className="select-none w-[10rem] p-[1rem] flex items-center justify-center rounded-[1rem]">
          <img src={ProductData?.Image_url} alt="" className="h-[5rem]" />
        </div>

        <div className="py-[.6rem] h-full w-[24rem] max-sm:w-[13rem]">
          <h3 className="text-[.8rem]">{ProductData?.product_category}</h3>
          <h2 className="font-semibold">{ProductData?.product_name}</h2>
          <div className="flex gap-[1rem]">
            {ProductData?.discount_rate && (
              <h2 className="italic font-semibold line-through text-black/80">
                ₹
                {ProductData?.product_price +
                  (10 * ProductData?.product_price) / 100}
              </h2>
            )}
            <h2 className="font-semibold">
              ₹{ProductData?.product_price}
              {ProductData?.discount_rate && ` (${ProductData?.discount_rate}%`}
            </h2>
          </div>
          <div className="font-semibold">
            Total : {ProductData?.product_price * productQuantity}
          </div>
        </div>

        <div className="max-sm:ml-[2rem] flex items-center gap-[1rem]">
          <div
            onClick={() => {
              handleAddToCart(
                ProductData._id,
                productQuantity + 1,
                ProductData.product_price
              );
              setProductQuantity(productQuantity + 1);
            }}
            className="cursor-pointer h-[2rem] w-[2rem] text-[1.3rem] rounded-[.2rem] flex justify-center transition-colors duration-300 items-center bg-black/80 hover:bg-black text-white"
          >
            <FaPlus className="text-[.8rem]" />
          </div>
          <div className="select-none text-[1.6rem] text-black">
            {" "}
            {productQuantity}
          </div>
          <div
            onClick={() => {
              if (productQuantity > 1) {
                handleAddToCart(
                  ProductData._id,
                  productQuantity - 1,
                  ProductData.product_price
                );
                setProductQuantity(productQuantity - 1);
              }
            }}
            className="cursor-pointer h-[2rem] w-[2rem] text-[1.3rem] rounded-[.2rem] flex justify-center transition-colors duration-300 items-center bg-black/80 hover:bg-black text-white"
          >
            <FaMinus className="text-[.8rem]" />
          </div>
        </div>
        <div className="max-sm:ml-[2rem] mr-[2rem] flex gap-[2rem]">
          <div className="cursor-pointer flex items-center px-[2rem] h-[2.6rem] w-fit rounded-[.4rem] text-[1.1rem] font-semibold text-white bg-green-600">
            Bay
          </div>
          <div
            onClick={() => {
              handleRemoveFromCart(ProductData?._id);
            }}
            className="cursor-pointer flex items-center px-[2rem] h-[2.6rem] w-fit rounded-[.4rem] text-[1.1rem] font-semibold text-white bg-red-500"
          >
            Remove
          </div>
        </div>
      </div>
    </>
  );
}

export default Cartcard;
