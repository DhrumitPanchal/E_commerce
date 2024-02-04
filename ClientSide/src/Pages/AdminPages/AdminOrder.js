import React, { useContext } from "react";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import { Context } from "../../Redux/Context";
import { NavLink } from "react-router-dom";
import OrderCard from "../../components/AdminComponent/OrderCard";
function AdminOrder() {
  const {
    user,
    setUser,
    productData,
    setProductData,
    handleLikedProducts,
    handleAddToCart,
  } = useContext(Context);
  return (
    <>
      <main className="px-[1.6rem] pt-[1.4rem] pb-[2rem] flex flex-col gap-[1.2rem]">
        <h2 className="ml-[.2rem] text-[1.4rem] underline font-semibold">
          Orders
        </h2>
        {productData.map((data, index) => (
          <OrderCard
            key={index}
            Prodata={data}
            quontity={user.cartProducts[index]?.Quontity}
          />
        ))}
      </main>
    </>
  );
}

export default AdminOrder;
