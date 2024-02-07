//Context Hook
import React, { createContext, useEffect, useState } from "react";
import Data from "../components/Data";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Context = createContext(null);

export default function MyContext(props) {
  const navigator = useNavigate();
  const [user, setUser] = useState({
    name: "dhrumit panchal",
    email: "dhrumit789@gmail.com",
    likedProducts: [],
    cartProducts: [],
  });

  const [productData, setProductData] = useState(null);

  //  Add Liked Product -------------------------------------------------
  const handleLikedProducts = async (ProductId) => {
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
      await axios
        .delete("http://localhost:8000/likedproducts", {
          data: { id: "65bb8d7ecb4e551c48bd4bde", productId: ProductId },
        })
        .then(() => {
          toast.success("Product removed from the ❤️");
        })
        .catch((err) => toast(err.msg));
    } else {
      setUser({
        ...user,
        likedProducts: [...user.likedProducts, { ProductID: ProductId }],
      });
      await axios
        .post("http://localhost:8000/likedproducts", {
          id: "65bb8d7ecb4e551c48bd4bde",
          productId: ProductId,
        })
        .then(() => {
          toast.success("Product Added to ❤️");
        })
        .catch((err) => {
          toast(err.response.data.msg);
          console.log();
        });
    }
  };

  //  Add to Car -------------------------------------------------
  const handleAddToCart = async (ProductId, quantity, prize) => {
    let checkIsCarted = user.cartProducts.some(
      (product) => product.ProductID === ProductId
    );
    if (checkIsCarted) {
      const items = user.cartProducts?.filter(
        (pro) => pro.ProductID !== ProductId
      );
      items.push({ ProductID: ProductId, Quantity: quantity, Prize: prize });
      setUser({
        ...user,
        cartProducts: items,
      });
      await axios
        .put("http://localhost:8000/cartproducts", {
          id: "65bb8d7ecb4e551c48bd4bde",
          productId: ProductId,
          Quantity: quantity,
          Prize: prize,
        })
        .then(() => {
          toast.success("Product Added to ❤️");
        })
        .catch((err) => {
          toast(err.response.data.msg);
          console.log();
        });
    } else {
      setUser({
        ...user,
        cartProducts: [
          ...user.cartProducts,
          { ProductID: ProductId, Quantity: quantity, Prize: prize },
        ],
      });
      await axios
        .post("http://localhost:8000/cartproducts", {
          id: "65bb8d7ecb4e551c48bd4bde",
          productId: ProductId,
          Quantity: quantity,
          Prize: prize,
        })
        .then(() => {
          toast.success("Product Added to ❤️");
        })
        .catch((err) => {
          toast(err.response.data.msg);
          console.log();
        });
    }
  };

  const handleRemoveFromCart = async (ProductId) => {
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
      await axios
        .delete("http://localhost:8000/cartproducts", {
          data: { id: "65bb8d7ecb4e551c48bd4bde", productId: ProductId },
        })
        .then(() => {
          toast.success("Product Added to ❤️");
        })
        .catch((err) => {
          toast(err.response.data.msg);
          console.log();
        });
    }
  };

  // get all products ---------------------------------------------
  const getAllProducts = async () => {
    await axios.get("http://localhost:8000/Products").then((result) => {
      setProductData(result.data.result);
    });
  };

  //  Add Product -------------------------------------------------

  const handelAddProduct = async (Data) => {
    try {
      await axios.post("http://localhost:8000/Products/add", Data);
      toast.success("Product Added Successfully");
      navigator("/admin/products");
      getAllProducts();
    } catch (error) {
      toast.error(error.msg);
    }
  };

  // Update Product --------------------------------------------------

  const handelUpdateProduct = async (productId, Data) => {
    try {
      await axios.put("http://localhost:8000/Products/update", {
        id: productId,
        data: { ...Data },
      });
      toast.success("Product Updated Successfully");
      navigator("/admin/products");
      getAllProducts();
    } catch (error) {
      toast.error(error.msg);
    }
  };

  // Delete Product --------------------------------------------------

  const handelDeleteProduct = async (productID) => {
    try {
      const result = await axios.delete(
        "http://localhost:8000/Products/delete",
        { data: { id: productID } }
      );
      console.log(result);
      toast.success("Product deleted successfully");
      getAllProducts();
    } catch (error) {
      toast.error(error.msg);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
        handelAddProduct,
        getAllProducts,
        handelDeleteProduct,
        handelUpdateProduct,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
