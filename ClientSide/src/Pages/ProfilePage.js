import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Redux/Context";
import { useNavigate } from "react-router-dom";
import OrderCard from "../components/AdminComponent/OrderCard";
function ProfilePage() {
  const { user, productData, allOrders, setAllOrders, handelGetallOrders } =
    useContext(Context);
  const [cartProduct, setCartProduct] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const navigator = useNavigate();

  useEffect(() => {
    if (!productData || !user.cartProducts) return;

    const filteredProducts = productData.filter((product) =>
      user.cartProducts.some((cartPro) => cartPro.ProductID === product._id)
    );
    setCartProduct(filteredProducts);
  }, [user.cartProducts, productData]);

  useEffect(() => {
    const filteredProducts = allOrders?.filter(
      (order) => order.user === user.userId
    );
    setUserOrders(filteredProducts);
  }, [allOrders]);

  function getOrderAgeInDays(orderDate) {
    const orderDateObj = new Date(orderDate);
    const currentDate = new Date();
    const diffInMilliseconds = currentDate - orderDateObj;
    const age = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24)) - 1;
    return age < 1 ? "Today" : age;
  }

  useEffect(() => {
    handelGetallOrders();
  }, []);
  useEffect(() => {
    setAllOrders(allOrders);
  }, [allOrders]);

  return (
    <section className="p-[2rem] min-h-[calc(100vh-3.5rem)] max-h-fit w-full">
      <h2 className="text-[1.6rem] font-semibold">
        Hello ,<span className="font-bold"> {user?.name}</span>
      </h2>

      <div className="mt-[3rem] border-t-[.2rem] border-black">
        <h2 className="mt-[1rem] text-[1.4rem] font-semibold">Your List</h2>

        <section className="mt-[1rem] w-full flex flex-wrap gap-[1.6rem] max-sm:gap-[2rem]">
          {cartProduct?.length > 0 ? (
            cartProduct.map((data, index) => (
              <div
                onClick={() => navigator(`/products/${data?._id}`)}
                className=" product-card cursor-pointer h-fit max-sm:w-[13rem] "
              >
                <div className="bg-slate-300 relative overflow-hidden h-[18rem] w-fit max-sm:h-fit max-sm:w-full flex justify-center items-center">
                  <img
                    src={data?.Image_url}
                    alt=""
                    className="flex items-center justify-center h-full "
                  />
                </div>
                <div className=" w-full max-sm:px-[.8rem] py-[.8rem] flex flex-col justify-between">
                  <div className="w-full">
                    <p className="w-[12rem] font-thin truncate ...">
                      {data?.product_name}
                    </p>
                  </div>
                  <div className="flex gap-[1rem] text-[.8rem]">
                    {data?.discount_rate && (
                      <h2 className="italic font-normal line-through ">
                        ₹
                        {data?.product_price + (10 * data?.product_price) / 100}
                      </h2>
                    )}
                    <h2 className="font-normal text-green-600">
                      ₹{data?.product_price}{" "}
                      {data?.discount_rate && `(${data?.discount_rate}%`}
                    </h2>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-center w-full text-[2rem] text-black/20">
              You not have any products
            </h2>
          )}
        </section>
      </div>

      {/* ----------------------------- orders----------------------------- */}

      <div className="mt-[1rem] border-t-[.2rem] border-black/60">
        <main className="pb-[2rem] flex flex-col gap-[1.2rem]">
          <h2 className="mt-[1rem] text-[1.4rem] font-semibold">Your Orders</h2>

          {userOrders?.length > 0 ? (
            userOrders?.map((data, index) => (
              <div
                key={data._id}
                className="flex flex-col border-b-[.5px] mb-[1rem] border-black/50 "
              >
                <div className="orders overflow-x-auto pb-[.6rem] flex gap-[1.6rem] mb-[.4rem]">
                  <OrderCard
                    key={index}
                    productsDetails={data}
                    quantity={user?.cartProducts[index]?.Quantity}
                  />
                </div>

                <div className="flex max-sm:flex-col py-[.8rem] border-t-[.8px]  border-black/30  items-center max-sm:items-start justify-between w-full">
                  <div className="flex max-sm:flex-col max-sm:gap-[.2rem] gap-[2rem] w-full">
                    <div className="flex gap-[.4rem] font-medium">
                      <h2>Total Items : </h2>
                      <h2>{data?.bill?.totalItems}</h2>
                    </div>

                    <div className="flex gap-[.3rem] font-medium ">
                      <h2>Total Amount : </h2>
                      <h2>{data?.bill?.totalAmount}</h2>
                    </div>

                    <div className="flex gap-[.3rem] font-medium ">
                      <h2>Order Added : </h2>
                      <h2>{getOrderAgeInDays(data?.date_added)}</h2>
                    </div>
                  </div>
                  <div className="cursor-pointer capitalize flex items-center text-[1.1rem] font-semibold ">
                    {data.status}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-center w-full text-[2rem] text-black/20">
              You not have any products
            </h2>
          )}
        </main>
      </div>
    </section>
  );
}

export default ProfilePage;
