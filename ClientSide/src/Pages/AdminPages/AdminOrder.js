import React, { useContext } from "react";
import { Context } from "../../Redux/Context";
import OrderCard from "../../components/AdminComponent/OrderCard";
function AdminOrder() {
  const { user, productData } = useContext(Context);
  return (
    <>
      <main className="px-[1.6rem] pt-[1.4rem] pb-[2rem] flex flex-col gap-[1.2rem]">
        <h2 className="ml-[.2rem] text-[1.4rem] underline font-semibold">
          Orders
        </h2>
        {productData?.map((data, index) => (
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
