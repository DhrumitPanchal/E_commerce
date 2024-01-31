//Context Hook
import React, { createContext, useEffect, useState } from "react";
import Data from "../components/Data";
export const Context = createContext(null);

export default function MyContext(props) {
  const [user, setUser] = useState({
    name: "dhrumit panchal",
    email: "dhrumit789@gmail.com",
    likedProducts: [],
    cartProducts: [],
  });

  const [productData, setProductData] = useState(Data);
  //  Add Liked Product -------------------------------------------------
  const handleLikedProducts = (ProductId) => {
    let checkIsLiked = user.likedProducts.some(
      (product) => product.ProductID === ProductId
    );

    if (checkIsLiked) {
      setUser({
        ...user,
        likedProducts: user.likedProducts.filter(
          (item) => item.ProductID !== ProductId
        ),
      });
    } else {
      setUser({
        ...user,
        likedProducts: [...user.likedProducts, { ProductID: ProductId }],
      });
    }
  };
  //  Add to Car -------------------------------------------------
  const handleAddToCart = (ProductId, quontity) => {
    let checkIsCarted = user.cartProducts.some(
      (product) => product.ProductID === ProductId
    );
    if (checkIsCarted) {
      const items = user.cartProducts?.filter(
        (pro) => pro.ProductID !== ProductId
      );
      items.push({ ProductID: ProductId, Quontity: quontity });
      setUser({
        ...user,
        cartProducts: items,
      });
    } else {
      setUser({
        ...user,
        cartProducts: [
          ...user.cartProducts,
          { ProductID: ProductId, Quontity: quontity },
        ],
      });
    }
  };

  const handleRemoveFromCart = (ProductId) => {
    let checkIsCarted = user.cartProducts.some(
      (product) => product.ProductID === ProductId
    );

    if (checkIsCarted) {
      setUser({
        ...user,
        cartProducts: user.cartProducts.filter(
          (item) => item.ProductID !== ProductId
        ),
      });
    }
  };

  useEffect(() => {
    console.log(user.cartProducts);
  }, [user.cartProducts]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        productData,
        setProductData,
        handleLikedProducts,
        handleAddToCart,
        handleRemoveFromCart,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
