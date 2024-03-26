import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../Redux/Context";
import { FaPlus, FaMinus } from "react-icons/fa";

function OrderCard(props) {
  const [orders, setOrders] = useState([]);
  const { productsDetails } = props;
  const { handleRemoveFromCart, productData } = useContext(Context);

  useEffect(() => {
    const filteredProducts = productData?.filter((product) =>
      productsDetails?.items.some((order) => order.ProductID === product?._id)
    );
    setOrders(filteredProducts);
  }, []);

  return (
    <>
      {orders?.map((item, index) => {
        return (
          <div className="h-fit max-sm:h-fit flex max-sm:flex-wrap gap-[.8rem] max-sm:gap-[0rem] max-sm:pb-[rem] ">
            <div
              onClick={() => navigator(`/products/${item?._id}`)}
              className="cursor-pointer  select-none h-[10rem] w-[7rem]"
            >
              <img src={item?.Image_url} alt="" className="h-full w-fit" />
            </div>

            <div className="flex max-sm:mt-[.4rem] flex-col gap-[.2rem] max-sm:gap-0 h-full w-[10rem] max-sm:w-[8rem] ">
              <h2 className="cursor-pointer text-[.8rem] font-normal w-[10rem] max-sm:w-[8rem]  truncate ...">
                {item?.product_name}
              </h2>

              <div className=" flex flex-col gap-[.2rem] w-full">
                <div className="flex font-normal gap-[.6rem]">
                  <h2>Prize : </h2>
                  <h2>₹{item?.product_price}.00</h2>
                </div>
                <div className="flex font-normal gap-[.6rem]">
                  <h2>Quantity : </h2>
                  <h2>{productsDetails.items[index]?.Quantity}</h2>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default OrderCard;
