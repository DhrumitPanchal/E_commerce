import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export const Context = createContext(null);

export default function MyContext(props) {
  const navigator = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({
    userId: "",
    name: "",
    email: "",
    likedProducts: [],
    cartProducts: [],
    userRole: "",
    userOrderID: "",
  });

  const [accessToken, setAccessToken] = useState(null);
  const [productData, setProductData] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const BaseURL = process.env.REACT_APP_BACKENDURL;
  const jwtSecretKey = process.env.jwtSecretKey;
  const adminRoleKeyWord = process.env.adminAccess;
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
        userRole: data.user.userRole,
        userOrderID: data.user.userOrderID,
      });
      toast.success("sign up successfully");
      navigator("/");
    } catch (error) {
      toast.error(error.response.data.msg);
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
        userRole: data.user.userRole,
        userOrderID: data.user.userOrderID,
      });

      setAccessToken(data.access_Token);
      Cookies.set("userAccessToken", data.access_Token, { expires: 365 });
      toast.success("sign in successfully");
      navigator("/");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  // login with jwt ---------------------------------------------------

  const handelJwtLogin = async () => {
    const token = Cookies.get("userAccessToken");
    try {
      if (token) {
        const { data } = await axios.post(BaseURL + "/jwtlogin", {
          access_Token: token,
        });
        setUser({
          name: data.name,
          email: data.email,
          userId: data._id,
          likedProducts: data.likedProducts,
          cartProducts: data.cartProducts,
          userRole: data.userRole,
          userOrderID: data.userOrderID,
        });
        if (
          location.pathname === "/login" ||
          location.pathname === "/register"
        ) {
          navigator("/");
        }
      } else {
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      navigator("/login");
    }
  };

  //  Add Liked Product -------------------------------------------------
  const handleLikedProducts = async (productId) => {
    let checkIsLiked = user.likedProducts.some(
      (product) => product.productId === productId
    );
    if (checkIsLiked) {
      setUser({
        ...user,
        likedProducts: user.likedProducts.filter(
          (item) => item.productId !== productId
        ),
      });
      await axios
        .delete(BaseURL + "/likedproducts", {
          data: { id: user.userId, productId: productId },
        })
        .then(() => {
          toast.success("Product removed from the ❤️");
        })
        .catch((err) => toast(err.msg));
    } else {
      setUser({
        ...user,
        likedProducts: [...user.likedProducts, { productId: productId }],
      });

      await axios
        .post(BaseURL + "/likedproducts", {
          id: user.userId,
          productId: productId,
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
          toast.success("Product Added to Cart");
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
      await axios.get(BaseURL + "/products").then((result) => {
        setProductData(result?.data?.result);
      });
    } catch (error) {
      toast.error(error?.response?.data?.msg);
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
      toast.error(error.response.data.msg);
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
      toast.error(error.response.data.msg);
    }
  };

  // Delete Product --------------------------------------------------

  const handelDeleteProduct = async (productId) => {
    try {
      const result = await axios.delete(BaseURL + "/Products/delete", {
        data: { id: productId },
      });
      console.log(result);
      toast.success("Product deleted successfully");
      getAllProducts();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  // get All orders --------------------------------------------

  const handelGetallOrders = async () => {
    try {
      const { data } = await axios.get(BaseURL + "/orders");
      setAllOrders(data.result);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  // get all users -----------------------------------------

  const handelGetAllUsers = async () => {
    try {
      const { data } = await axios.get(BaseURL + "/getallusers");
      setAllUsers(data.allUsers);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  // add all cart order --------------------------------------------

  const handelAllCartAddOrder = async () => {
    let totalItems = 0;
    let totalAmount = 0;
    user.cartProducts.map((pro) => {
      return (totalItems += pro.Quantity);
    });

    user.cartProducts.map((pro) => {
      return (totalAmount += pro.Prize * pro.Quantity);
    });

    console.log("bill all order : " + totalItems + totalAmount);
    try {
      await axios.post(BaseURL + "/orders", {
        user: user.userId,
        items: user.cartProducts,
        bill: {
          totalItems,
          totalAmount,
        },
      });

      await axios.delete(BaseURL + "/cartproducts/all", {
        data: { id: user?.userId },
      });
      setUser({
        ...user,
        cartProducts: [],
      });
      toast.success("order added successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  // add single order -------------------------------------

  const handelSingleOrder = async (id, prize, quantity) => {
    try {
      await axios.post(BaseURL + "/orders", {
        user: user.userId,
        items: [{ ProductID: id, Prize: prize, Quantity: quantity }],
        bill: {
          totalItems: quantity,
          totalAmount: quantity * prize,
        },
      });
      await axios.delete(BaseURL + "/cartproducts", {
        data: { id: user.userId, productId: id },
      });
      setUser({
        ...user,
        cartProducts: user.cartProducts.filter((item) => item.ProductID !== id),
      });

      toast.success("order added successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
    handelGetallOrders();
  };

  // admin access using email and password ----------------------

  const handelAdminAccess = async (email, password) => {
    try {
      const { data } = await axios.post(BaseURL + "/adminlogin", {
        email: email,
        password: password,
      });
      setUser({ ...user, userRole: data.role });

      // Check if the user role is "admin"
      if (data.role === "admin") {
        navigator("/admin/products");
      } else {
        navigator("/admin");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const googleLogin = async (credentialResponse) => {
    try {
      const { data } = await axios.post(BaseURL + "/google", {
        credential: credentialResponse,
      });

      setUser({
        name: data?.user?.name,
        email: data?.user?.email,
        userId: data?.user?._id,
        likedProducts: data?.user?.likedProducts,
        cartProducts: data?.user?.cartProducts,
        userRole: data?.user?.userRole,
        userOrderID: data?.user?.userOrderID,
      });

      setAccessToken(data?.access_Token);
      Cookies.set("userAccessToken", data?.access_Token, { expires: 365 });
      toast.success("sign in successfully");
      navigator("/");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  useEffect(() => {
    getAllProducts();
    handelGetallOrders();
    handelGetAllUsers();
    handelJwtLogin();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        googleLogin,
        productData,
        allOrders,
        allUsers,
        setAllUsers,
        handelAdminAccess,
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
