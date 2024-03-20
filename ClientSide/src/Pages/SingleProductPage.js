import React, { useContext, useEffect, useState, lazy } from "react";
import { FaPlus, FaMinus, FaHeart, FaRegHeart } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../Redux/Context";
const ProductCard = lazy(() => import("../components/ProductCard"));

function SingleProductPage() {
  const {
    user,
    productData,
    handleLikedProducts,
    handleAddToCart,
    handelSingleOrder,
  } = useContext(Context);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  const { productID } = useParams();
  useEffect(() => {
    const Product = productData?.filter((item) => item?._id === productID);
    Product && setProduct(Product[0]);
  }, [productData, productID]);

  useEffect(() => {
    const IsLiked = user?.likedProducts?.some(
      (likedProduct) => likedProduct?.productId === productID
    );

    setLiked(IsLiked);
  }, [user?.likedProducts, user, productID, productData]);

  const toggleLiked = () => {
    setLiked((prevLiked) => !prevLiked);
    handleLikedProducts(productID);
  };

  return (
    <>
      {product ? (
        <section className="py-[4rem] px-[6rem] max-sm:px-[2rem] h-fit flex justify-between max-sm:flex-col gap-[6rem] ">
          <div className="w-[60rem] h-[30rem] max-sm:w-full max-sm:h-fit flex justify-center items-center ">
            <img
              alt=""
              src={product?.Image_url}
              className=" w-[20rem] bg-blue-gray-500"
            />
          </div>
          <div className="flex flex-col w-full bg-white ">
            <div className="flex justify-between ">
              <div>
                <h2 className="text-[1.6rem] font-semibold">
                  {product?.product_name}
                </h2>
                <h2 className="text-[1.1rem] font-semibold">
                  Brand : {product?.product_brand}
                </h2>
              </div>
              <div onClick={() => toggleLiked()} className="mr-[.3rem] ">
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

            <h2 className="mt-[.4rem] text-[1.2rem] font-normal">
              {product?.product_description}
            </h2>
            {/* <div className="mt-[.6rem] flex items-center gap-[.6rem]">
        <h2 className="text-[1.2rem]">
          Rating :{" "}
          <span className="ml-[.6rem]">
            {Math.round(product?.product_rating)}
          </span>
        </h2>{" "}
        <Rating value={3} />
      </div> */}
            <div className="mt-[.8rem] flex flex-col">
              <div className="flex  gap-[1rem]">
                {product?.discount_rate && (
                  <h2 className="text-[1.6rem] text-red-500">
                    {`- ${product?.discount_rate}%`}
                  </h2>
                )}

                <h2 className="text-[1.6rem] font-semibold">
                  ₹{product?.product_price}
                </h2>
              </div>
              <div>
                <h2 className="text-[1.2rem] font-semibold line-through italic text-red-700 ">
                  ₹
                  {product?.product_price + (10 * product?.product_price) / 100}
                </h2>
              </div>
              <p>Inclusive of all taxes</p>
            </div>

            <div className="mt-[1rem]  flex items-center gap-[1rem]">
              <div
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="cursor-pointer h-[2rem] w-[2rem] text-[1.3rem] rounded-[.2rem] flex justify-center transition-colors duration-300 items-center bg-black/80 hover:bg-black text-white"
              >
                <FaMinus className="text-[.8rem]" />
              </div>
              <div className="select-none text-[1.6rem] text-black">
                {" "}
                {quantity}{" "}
              </div>
              <div
                onClick={() => setQuantity(quantity + 1)}
                className="cursor-pointer h-[2rem] w-[2rem] text-[1.3rem] rounded-[.2rem] flex justify-center transition-colors duration-300 items-center bg-black/80 hover:bg-black text-white"
              >
                <FaPlus className="text-[.8rem]" />
              </div>
            </div>
            <div className="mt-[1.2rem]  mr-[2rem] flex gap-[2rem]">
              <div
                onClick={() =>
                  handelSingleOrder(
                    product?._id,
                    quantity,
                    product?.product_price
                  )
                }
                className="cursor-pointer flex items-center px-[2rem] h-[2.6rem] w-fit rounded-[.4rem] text-[1.1rem] font-semibold text-white bg-green-600"
              >
                Bay
              </div>
              <div
                onClick={() =>
                  handleAddToCart(
                    product?._id,
                    quantity,
                    product?.product_price
                  )
                }
                className="cursor-pointer flex items-center px-[2rem] h-[2.6rem] w-fit rounded-[.4rem] text-[1.1rem] font-semibold text-white bg-green-600"
              >
                <h2>Add to Cart</h2>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="h-[30rem] flex items-center justify-center">
          <h2 className="text-[1.6rem] text-black/30">product not found</h2>
        </div>
      )}

      <h2 className="ml-[2.6rem] mt-[1rem] px-[1rem] text-[1.8rem] font-semibold">
        Other products
      </h2>
      <section className="mb-[4rem] mt-[2rem] flex justify-center flex-wrap gap-[3rem] max-sm:gap-[1rem] ">
        {productData?.map((e) => (
          <ProductCard data={e} />
        ))}
      </section>
    </>
  );
}

export default SingleProductPage;
