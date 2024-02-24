import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Redux/Context";
import OrderCard from "../../components/AdminComponent/OrderCard";
function AdminOrder() {
  const { user, productData, allOrders, setAllOrders } = useContext(Context);
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
            <OrderCard
              key={index}
              productData={data}
              quantity={user.cartProducts[index]?.Quantity}
            />
          ))}
      </main>
    </>
  );
}

export default AdminOrder;