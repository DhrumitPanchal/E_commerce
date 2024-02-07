import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Redux/Context";
function CartCard(props) {
  const { ProductData } = props;
  const { handelDeleteProduct } = useContext(Context);
  return (
    <>
      <div className=" h-[8rem] max-sm:h-fit p-[.6rem] flex max-sm:flex-wrap items-center justify-between gap-[2rem] max-sm:gap-[1rem] max-sm:pb-[2rem] rounded-[1rem]  shadow-[0px_2px_5px_1px_rgba(0,0,0,0.2)]">
        <div className="flex h-full gap-[2rem]">
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
                {ProductData?.discount_rate &&
                  ` (${ProductData?.discount_rate}%`}
              </h2>
            </div>
            <h3 className="font-semibold">
              <span>stock : </span>{" "}
              {ProductData?.product_stock ? (
                ProductData?.product_stock
              ) : (
                <span className="text-red-500">out of stock</span>
              )}
            </h3>
          </div>
        </div>

        <div className="max-sm:ml-[2rem] mr-[2rem] flex gap-[2rem]">
          <Link to={`update/${ProductData._id}`}>
            <div className="cursor-pointer flex items-center px-[2rem] h-[2.6rem] w-fit rounded-[.4rem] text-[1.1rem] font-semibold text-white bg-green-600">
              Update
            </div>
          </Link>

          <div
            onClick={() => handelDeleteProduct(ProductData._id)}
            className="cursor-pointer flex items-center px-[2rem] h-[2.6rem] w-fit rounded-[.4rem] text-[1.1rem] font-semibold text-white bg-red-500"
          >
            Remove
          </div>
        </div>
      </div>
    </>
  );
}

export default CartCard;
