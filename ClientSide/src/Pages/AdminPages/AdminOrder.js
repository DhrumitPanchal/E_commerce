import React, { useContext, useEffect } from "react";
import { Context } from "../../Redux/Context";
import OrderCard from "../../components/AdminComponent/OrderCard";
function AdminOrder() {
  const {
    user,
    allOrders,
    setAllOrders,
    handelGetallOrders,
    handelUpdateOrder,
  } = useContext(Context);

  function getOrderAgeInDays(orderDate) {
    const orderDateObj = new Date(orderDate);
    const currentDate = new Date();
    const diffInMilliseconds = currentDate - orderDateObj;
    const Days = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24)) - 1;
    return Days < 1 ? "Today" : Days;
  }

  function updateStatus(data) {
    let updatedStatus =
      (data?.status === "Order Placed" && "Processing") ||
      (data?.status === "Processing" && "Shipped") ||
      (data?.status === "Shipped" && "Delivered");
    handelUpdateOrder(data?._id, { status: updatedStatus });
  }
  function cancelOrder(data) {
    if (data.status !== "Delivered") {
      handelUpdateOrder(data?._id, { status: "Cancelled" });
    }
  }

  useEffect(() => {
    handelGetallOrders();
  }, []);
  useEffect(() => {
    setAllOrders(allOrders);
  }, [allOrders]);

  return (
    <>
      <main className="px-[1.6rem] max-sm:px-[1rem] pt-[.6rem] pb-[2rem] flex flex-col gap-[1.2rem]">
        <h2 className="max-sm:text-end ml-[.2rem] text-[1.4rem] font-bold underline ">
          Orders
        </h2>

        {allOrders.length > 0 &&
          allOrders?.map((data, index) => (
            <div className="flex flex-col border-b-[.5px] mb-[1rem] border-black/50 ">
              <div className="orders overflow-x-auto pb-[.6rem] flex gap-[1.6rem] mb-[.4rem]">
                <OrderCard
                  key={index}
                  productsDetails={data}
                  quantity={user.cartProducts[index]?.Quantity}
                />
              </div>

              <div className="flex max-sm:flex-col py-[.8rem] border-t-[.8px]  border-black/30  items-center max-sm:items-start justify-between w-full">
                <div className="flex max-sm:flex-col max-sm:gap-[.2rem] gap-[2rem] w-fit">
                  <div className="flex gap-[.4rem] font-medium">
                    <h2>Total Items : </h2>
                    <h2>{data?.bill?.totalItems}</h2>
                  </div>

                  <div className="flex gap-[.3rem] font-medium ">
                    <h2>Total Amount : </h2>
                    <h2>{data?.bill?.totalAmount}</h2>
                  </div>

                  <div className="flex gap-[.3rem] font-medium ">
                    <h2>Order Added : </h2>
                    <h2>
                      {getOrderAgeInDays(data?.date_added)}{" "}
                      <span className="text-[.8rem] font-normal">day ago</span>
                    </h2>
                  </div>
                </div>

                <div className="max-sm:mt-[.8rem] flex gap-[2rem] max-sm:gap-[.8rem] w-fit ">
                  <div
                    className={`${
                      data?.status === "Cancelled" && "max-sm:block"
                    } ${
                      data?.status === "Delivered" && "max-sm:block"
                    } capitalize flex items-center  px-[1rem] h-[2.2rem] max-w-[10rem] min-w-fit rounded-[.4rem] text-[1.1rem] font-semibold ${
                      data.status === "Cancelled"
                        ? "text-red-500"
                        : "text-black/50"
                    } ${
                      data.status === "Delivered"
                        ? "text-green-500"
                        : "text-black/50"
                    } } `}
                  >
                    {data.status}
                  </div>
                  {data?.status !== "Cancelled" &&
                    data?.status !== "Delivered" && (
                      <div
                        onClick={() => updateStatus(data)}
                        className="cursor-pointer capitalize flex items-center px-[2rem] h-[2.2rem] w-fit rounded-[.4rem] text-[1.1rem] font-semibold text-white bg-green-600/70 hover:bg-green-600 transition-all duration-300"
                      >
                        {data.status === "Order Placed" && "Processing"}
                        {data.status === "Processing" && "Shipped"}
                        {data.status === "Shipped" && "Delivered"}
                      </div>
                    )}
                  {data?.status === "Delivered" ||
                    (data?.status !== "Cancelled" && (
                      <div
                        onClick={() => cancelOrder(data)}
                        className="cursor-pointer capitalize flex items-center px-[2rem] h-[2.2rem] w-fit rounded-[.4rem] text-[1.1rem] font-semibold text-white bg-red-500/80 hover:bg-red-500  transition-all duration-300"
                      >
                        cancel
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </main>
    </>
  );
}

export default AdminOrder;
