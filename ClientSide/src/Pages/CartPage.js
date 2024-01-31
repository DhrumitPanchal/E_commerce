import React, { useState, useContext, useEffect } from "react";
import Data from "../components/Data";
import { Context } from "../Redux/Context";
import Cartcard from "../components/Cartcard";
function CartPage() {
  const {
    user,
    setUser,
    productData,
    setProductData,
    handleLikedProducts,
    handleAddToCart,
  } = useContext(Context);

  const [cartProduct, setCartProduct] = useState([]);

  useEffect(() => {
    if (!productData || !user.cartProducts) return;

    const filteredProducts = productData.filter((product) =>
      user.cartProducts.some(
        (cartPro) => cartPro.ProductID === product.productID
      )
    );

    setCartProduct(filteredProducts);
  }, [user.cartProducts, productData]);

  return (
    <>
      <section className="px-[4rem] max-sm:px-[1rem] py-[2rem] min-h-[calc(100vh-3.5rem)] flex flex-col gap-[1.6rem]">
        {cartProduct.map((data, index) => (
          <Cartcard
            key={index}
            Prodata={data}
            quontity={user.cartProducts[index]?.Quontity}
          />
        ))}
        <div className="mt-[1rem] cursor-pointer h-[2.8rem] px-[2rem] flex gap-[2rem] rounded-[.6rem] items-center w-fit  bg-black">
          <div className="text-[1.3rem] font-semibold text-white">Total :</div>
          <div className="text-[1.3rem] font-semibold text-white">₹ 45000</div>
        </div>
      </section>
    </>
  );
}

export default CartPage;
