import React, { useState, useContext, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Context } from "../Redux/Context";

function Cartcard(props) {
  const { Prodata, quontity } = props;
  const [quantity, setQuantity] = useState(quontity);
  const {
    user,
    productData,
    setProductData,
    handleLikedProducts,
    handleAddToCart,
    handleRemoveFromCart,
  } = useContext(Context);
  useEffect(() => {
    setQuantity(quantity);
  }, []);
  console.log(Prodata, quontity);
  return (
    <>
      <div className="h-[8rem] max-sm:h-fit p-[.6rem] flex max-sm:flex-wrap items-center justify-between gap-[2rem] max-sm:gap-[1rem] max-sm:pb-[2rem] rounded-[1rem]  shadow-[0px_2px_5px_1px_rgba(0,0,0,0.2)]">
        <div className="select-none w-[10rem] p-[1rem] flex items-center justify-center rounded-[1rem]">
          <img src={Prodata?.Image_url} alt="" className="h-[5rem]" />
        </div>

        <div className="py-[.6rem] h-full w-[24rem] max-sm:w-[13rem]">
          <h3 className="text-[.8rem]">{Prodata?.product_category}</h3>
          <h2 className="font-semibold">{Prodata?.product_name}</h2>
          <div className="flex gap-[1rem]">
            {Prodata?.discount_rate && (
              <h2 className="font-semibold line-through italic text-black/80">
                ₹{Prodata?.product_price + (10 * Prodata?.product_price) / 100}
              </h2>
            )}
            <h2 className="font-semibold">
              ₹{Prodata?.product_price}
              {Prodata?.discount_rate && ` (${Prodata?.discount_rate}%`}
            </h2>
          </div>
          <div className="font-semibold">
            Total : {quantity * Prodata?.product_price}
          </div>
        </div>

        <div className="max-sm:ml-[2rem] flex items-center gap-[1rem]">
          <div
            onClick={() => {
              setQuantity(quantity + 1);
              handleAddToCart(Prodata.productID, quantity);
            }}
            className="cursor-pointer h-[2rem] w-[2rem] text-[1.3rem] rounded-[.2rem] flex justify-center transition-colors duration-300 items-center bg-black/80 hover:bg-black text-white"
          >
            <FaPlus className="text-[.8rem]" />
          </div>
          <div className="select-none text-[1.6rem] text-black">
            {" "}
            {quantity}
          </div>
          <div
            onClick={() => {
              quantity > 1 && setQuantity(quantity - 1);
              handleAddToCart(Prodata.productID, quantity);
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
              handleRemoveFromCart(Prodata?.productID);
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
