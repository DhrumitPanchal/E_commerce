import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../Redux/Context";

function OrderCard(props) {
  const [orders, setOrders] = useState([]);
  const { productsDetails } = props.productData;
  const { handleRemoveFromCart, productData } = useContext(Context);

  useEffect(() => {
    const filteredProducts = productData?.filter((product) =>
      productsDetails?.some((order) => order.ProductID === product?._id)
    );
    setOrders(filteredProducts);
  }, []);

  return (
    <div className="h-[8rem] max-sm:h-fit p-[.6rem] flex max-sm:flex-wrap items-center justify-between gap-[2rem] max-sm:gap-[1rem] max-sm:pb-[2rem] rounded-[1rem]  shadow-[0px_2px_5px_1px_rgba(0,0,0,0.2)]">
      <div className="flex h-full gap-[2rem]">
        <div className="select-none w-[10rem] p-[1rem] flex items-center justify-center rounded-[1rem]">
          <img src={orders[0]?.Image_url} alt="" className="h-[5rem]" />
        </div>

        <div className="py-[.6rem] h-full w-[24rem] max-sm:w-[13rem]">
          <h3 className="text-[.8rem]">{orders[0]?.product_category}</h3>
          <h2 className="font-semibold">{orders[0]?.product_name}</h2>
          <div className="flex gap-[1rem]">
            {orders[0]?.discount_rate && (
              <h2 className="italic font-semibold line-through text-black/80">
                ₹
                {orders[0]?.product_price +
                  (10 * orders[0]?.product_price) / 100}
              </h2>
            )}
            <h2 className="font-semibold">
              ₹{orders[0]?.product_price}
              {orders[0]?.discount_rate && ` (${orders[0]?.discount_rate}%`}
            </h2>
          </div>
          <h3 className="font-semibold">
            Quantity : {productsDetails[0]?.Quantity}
          </h3>
        </div>
      </div>

      <div className="max-sm:ml-[2rem] mr-[2rem] flex gap-[2rem]">
        <div className="cursor-pointer flex items-center px-[2rem] h-[2.6rem] w-fit rounded-[.4rem] text-[1.1rem] font-semibold text-white bg-green-600">
          Done
        </div>
        <div
          onClick={() => {
            handleRemoveFromCart(orders[0]?.productID);
          }}
          className="cursor-pointer flex items-center px-[2rem] h-[2.6rem] w-fit rounded-[.4rem] text-[1.1rem] font-semibold text-white bg-red-500"
        >
          Cancel
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
