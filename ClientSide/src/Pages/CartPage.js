import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Redux/Context";
import CartPageCard from "../components/CartPageCard";
function CartPage() {
  const { user, productData, handelAllCartAddOrder } = useContext(Context);

  const [cartProduct, setCartProduct] = useState(null);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (!productData || !user.cartProducts) return;

    const filteredProducts = productData.filter((product) =>
      user.cartProducts.some((cartPro) => cartPro.ProductID === product._id)
    );
    setCartProduct(filteredProducts);
  }, [user.cartProducts, productData]);

  useEffect(() => {
    let allproTotal = 0;
    user.cartProducts.length > 0 &&
      user.cartProducts?.map((product) => {
        let productTotal = product?.Prize * product?.Quantity;
        allproTotal = allproTotal + productTotal;
      });
    setTotal(allproTotal);
  }, [cartProduct, user.cartProducts]);

  return (
    <>
      <section className="px-[4rem] max-sm:px-[1rem] py-[2rem] min-h-[calc(100vh-3.5rem)] flex flex-col gap-[1.6rem]">
        {cartProduct?.length > 0 ? (
          cartProduct.map((data, index) => (
            <CartPageCard
              key={index}
              ProductData={data}
              quantity={user.cartProducts[index]?.Quantity}
            />
          ))
        ) : (
          <h2 className="text-center w-full text-[3rem] text-black/20">
            You not have any products
          </h2>
        )}

        {cartProduct?.length > 0 && (
          <div
            onClick={() => handelAllCartAddOrder()}
            className="mt-[1rem] cursor-pointer h-[2.8rem] px-[2rem] flex gap-[2rem] rounded-[.6rem] items-center w-fit  bg-black"
          >
            <div className="text-[1.3rem] font-semibold text-white">
              Total :
            </div>
            <div className="text-[1.3rem] font-semibold text-white">
              ₹ {total}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default CartPage;
