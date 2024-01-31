import React, { useState, useContext, useEffect, useRef } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Context } from "../Redux/Context";
import { useNavigate } from "react-router-dom";
function ProductCard(props) {
  const data = props.data;
  const [liked, setLiked] = useState(false);
  const { user, productData, handleLikedProducts } = useContext(Context);
  const nevigetor = useNavigate();
  useEffect(() => {
    if (!productData || !user.likedProducts) return;

    const IsLiked = user.likedProducts.some(
      (likedProduct) => likedProduct.ProductID === data.productID
    );

    setLiked(IsLiked);
  }, [user.likedProducts]);

  const toggleLiked = () => {
    setLiked((prevLiked) => !prevLiked);
    handleLikedProducts(data?.productID);
  };

  let SidemenuRef = useRef();
  // useEffect(() => {
  //   let handler = (e) => {
  //     if (!SidemenuRef.current.contains(e.target)) {
  //       nevigetor(`products/${data.productID}`);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler);

  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // });

  return (
    <>
      <div
        onClick={() => nevigetor(`/products/${data?.productID}`)}
        ref={SidemenuRef}
        className="cursor-pointer"
      >
        <div className="overflow-hidden h-[14rem] w-[16rem] max-sm:h-[10rem] max-sm:w-[12rem] flex justify-center items-center">
          <img
            src={data?.Image_url}
            alt=""
            className=" h-[9rem] flex justify-center items-center"
          />
        </div>
        <div className="pt-[.8rem] flex justify-between">
          <div>
            <h3 className="text-[.8rem]">{data?.product_category}</h3>
            <h2 className="font-semibold">{data?.product_name}</h2>
            <div className="flex gap-[1rem]">
              <h2 className="font-semibold line-through text-black/80">
                <h2 className="font-semibold line-through italic text-black/80">
                  ₹{data?.product_price + (10 * data?.product_price) / 100}
                </h2>
              </h2>
              <h2 className="font-semibold">
                ₹{data?.product_price}{" "}
                {data?.discount_rate && `(${data?.discount_rate}%`}
              </h2>
            </div>
          </div>
          <div>
            <div
              ref={SidemenuRef}
              onClick={() => toggleLiked()}
              className="mr-[.3rem] "
            >
              {liked ? (
                <FaHeart
                  onClick={() => {
                    setLiked(!liked);
                  }}
                  className="text-red-500 text-[1.3rem] "
                />
              ) : (
                <FaRegHeart
                  onClick={() => setLiked(!liked)}
                  className="text-[1.3rem] "
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
