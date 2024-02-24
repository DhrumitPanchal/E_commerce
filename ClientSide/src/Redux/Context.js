//Context Hook
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Context = createContext(null);

export default function MyContext(props) {
  const navigator = useNavigate();
  const [user, setUser] = useState({
    userId: "",
    name: "",
    email: "",
    likedProducts: [],
    cartProducts: [],
  });

  const [productData, setProductData] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const BaseURL = process.env.REACT_APP_BACKENDURL;
  // sign up ---------------------------------------------------------

  const handelSignUp = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post(BaseURL + "/register", {
        name,
        email,
        password,
      });

      setUser({
        ...user,
        name: data.user.name,
        email: data.user.email,
        userId: data.user._id,
      });

      console.log("state data is : " + { ...user });
      toast.success("sign up successfully");
      navigator("/");
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log();
    }
  };

  // sign in --------------------------------------------------------

  const handelSignIn = async ({ email, password }) => {
    try {
      const { data } = await axios.post(BaseURL + "/login", {
        email,
        password,
      });

      setUser({
        name: data.user.name,
        email: data.user.email,
        userId: data.user._id,
        likedProducts: data.user.likedProducts,
        cartProducts: data.user.cartProducts,
      });

      toast.success("sign in successfully");
      navigator("/");
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log();
    }
  };

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
        .delete(BaseURL + "/likedproducts", {
          data: { id: user.userId, productId: ProductId },
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
        .post(BaseURL + "/likedproducts", {
          id: user.userId,
          productId: ProductId,
        })
        .then(() => {
          toast.success("Product Added to ❤️");
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
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
        .put(BaseURL + "/cartproducts", {
          id: user.userId,
          productId: ProductId,
          Quantity: quantity,
          Prize: prize,
        })
        .then(() => {
          toast.success("Product Added to cart");
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
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
        .post(BaseURL + "/cartproducts", {
          id: user.userId,
          productId: ProductId,
          Quantity: quantity,
          Prize: prize,
        })
        .then(() => {
          toast.success("Product Added to ❤️");
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
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
        .delete(BaseURL + "/cartproducts", {
          data: { id: user.userId, productId: ProductId },
        })
        .then(() => {
          toast.success("Product Removed to from cart");
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
          console.log();
        });
    }
  };

  // get all products ---------------------------------------------
  const getAllProducts = async () => {
    try {
      await axios.get(BaseURL + "/Products").then((result) => {
        setProductData(result.data.result);
      });
    } catch (error) {
      toast.error(error.msg);
    }
  };

  //  Add Product -------------------------------------------------

  const handelAddProduct = async (Data) => {
    try {
      await axios.post(BaseURL + "/Products/add", Data);
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
      await axios.put(BaseURL + "/Products/update", {
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
      const result = await axios.delete(BaseURL + "/Products/delete", {
        data: { id: productID },
      });
      console.log(result);
      toast.success("Product deleted successfully");
      getAllProducts();
    } catch (error) {
      toast.error(error.msg);
    }
  };

  // get All orders --------------------------------------------

  const handelGetallOrders = async () => {
    try {
      const { data } = await axios.get(BaseURL + "/orders");
      setAllOrders(data.result);
    } catch (error) {
      toast.error(error.msg);
    }
  };

  // add all cart order --------------------------------------------

  const handelAllCartAddOrder = async () => {
    try {
      await axios.post(BaseURL + "/orders", {
        userID: user.userId,
        orderData: user.cartProducts,
      });

      toast.success("order added successfully");
    } catch (error) {
      toast.error(error.msg);
    }
  };

  // add single order -------------------------------------

  const handelSingleOrder = async (id, prize, quantity) => {
    try {
      await axios.post(BaseURL + "/orders", {
        userID: user.userId,
        orderData: [{ ProductID: id, Prize: prize, Quantity: quantity }],
      });

      toast.success("order added successfully");
    } catch (error) {
      toast.error(error.msg);
    }
    handelGetallOrders();
  };

  // get all users -----------------------------------------

  const handelGetAllUsers = async () => {
    try {
      const { data } = await axios.get(BaseURL + "/getallusers");
      setAllUsers(data.allUsers);
    } catch (error) {
      toast.error(error.msg);
    }
  };

  useEffect(() => {
    getAllProducts();
    handelGetallOrders();
    handelGetAllUsers();
  }, []);

  useEffect(() => {
    console.log("state " + user.name, user.userId, user.likedProducts);
  }, [user]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        productData,
        allOrders,
        allUsers,
        setAllUsers,
        setAllOrders,
        setProductData,
        handleLikedProducts,
        handleAddToCart,
        handleRemoveFromCart,
        handelAddProduct,
        handelSingleOrder,
        getAllProducts,
        handelDeleteProduct,
        handelUpdateProduct,
        handelAllCartAddOrder,
        handelGetallOrders,
        handelGetAllUsers,
        handelSignUp,
        handelSignIn,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
