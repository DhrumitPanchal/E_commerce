import React, { useContext, useEffect, useState } from "react";
import Data from "../components/Data";
import ProductCard from "../components/ProductCard";
import { Context } from "../Redux/Context";
function LikedProPage() {
  const { user, setUser, productData, setProductData, handleLikedProducts } =
    useContext(Context);

  const [likedProduct, setLikedProduct] = useState(null);
  useEffect(() => {
    if (!productData || !user?.likedProducts) return;

    const filteredProducts = productData?.filter((product) =>
      user.likedProducts?.some(
        (likedProduct) => likedProduct.ProductID === product?._id
      )
    );
    setLikedProduct(filteredProducts);
    console.log(filteredProducts);
  }, [user?.likedProducts]);

  return (
    <div className="mt-[2rem] mb-[4rem] px-[3rem] flex flex-wrap max-sm:justify-between min-h-[calc(100vh-3.5rem)] w-full gap-[3rem] max-sm:gap-[1rem]">
      {likedProduct || likedProduct?.length < 0 ? (
        likedProduct?.map((product) => (
          <ProductCard key={product?.id} data={product} />
        ))
      ) : (
        <h2 className="text-center w-full text-[3rem] text-black/20">
          You not have any products
        </h2>
      )}
    </div>
  );
}

export default LikedProPage;
