import React, { useContext, useEffect, useState } from "react";
import Data from "../components/Data";
import ProductCard from "../components/ProductCard";
import { Context } from "../Redux/Context";
function LikedProPage() {
  const { user, setUser, productData, setProductData, handleLikedProducts } =
    useContext(Context);

  const [likedProduct, setLikedProduct] = useState([]);
  useEffect(() => {
    if (!productData || !user.likedProducts) return;

    const filteredProducts = productData.filter((product) =>
      user.likedProducts.some(
        (likedProduct) => likedProduct.ProductID === product.productID
      )
    );
    setLikedProduct(filteredProducts);
  }, [productData, user.likedProducts]);

  return (
    <div className="mt-[3rem] flex justify-center flex-wrap min-h-[calc(100vh-3.5rem)] gap-[3rem]">
      {likedProduct.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
}

export default LikedProPage;
