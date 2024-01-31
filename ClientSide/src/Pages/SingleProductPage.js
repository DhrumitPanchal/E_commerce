import React, { useContext, useEffect, useState, lazy } from "react";
import {
  FaShoppingBag,
  FaHeart,
  FaUser,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { Rating } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { Context } from "../Redux/Context";
const ProductCard = lazy(() => import("../components/ProductCard"));
function SingleProductPage() {
  const { productData, setProductData, handleLikedProducts, handleAddToCart } =
    useContext(Context);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { productID } = useParams();
  useEffect(() => {
    const Product = productData.filter((item) => item.productID === productID);
    setProduct(Product[0]);
  }, []);
  return (
    <>
      <section className="py-[4rem] px-[6rem] h-fit flex justify-between gap-[6rem] ">
        <div className="w-[60rem] h-[30rem] flex justify-center items-center ">
          <img
            src={product?.Image_url}
            className=" w-[20rem] bg-blue-gray-500"
          />
        </div>
        <div className="flex flex-col w-full bg-white ">
          <h2 className="text-[1.6rem] font-semibold">
            {product?.product_name}
          </h2>
          <h2 className="text-[1.1rem] font-semibold">
            Brand : {product?.product_brand}
          </h2>
          <h2 className="mt-[.4rem] text-[1.2rem] font-normal">
            {product?.product_description}
          </h2>
          <div className="mt-[.6rem] flex items-center gap-[.6rem]">
            <h2 className="text-[1.2rem]">
              Rating :{" "}
              <span className="ml-[.6rem]">
                {Math.round(product?.product_rating)}
              </span>
            </h2>{" "}
            <Rating value={3} />
          </div>
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
              <h2 className="text-[1.2rem] font-semibold line-through italic text-black/80">
                ₹{product?.product_price + (10 * product?.product_price) / 100}
              </h2>
            </div>
            <p>Inclusive of all taxes</p>
          </div>

          <div className="mt-[1rem] max-sm:ml-[2rem] flex items-center gap-[1rem]">
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
          <div className="mt-[1.2rem] max-sm:ml-[2rem] mr-[2rem] flex gap-[2rem]">
            <div className="cursor-pointer flex items-center px-[2rem] h-[2.6rem] w-fit rounded-[.4rem] text-[1.1rem] font-semibold text-white bg-green-600">
              Bay
            </div>
            <div
              onClick={() => handleAddToCart(product?.productID, quantity)}
              className="cursor-pointer flex items-center px-[2rem] h-[2.6rem] w-fit rounded-[.4rem] text-[1.1rem] font-semibold text-white bg-green-600"
            >
              <h2>Add to Cart</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[3rem] flex justify-center flex-wrap gap-[3rem]">
        {productData.map((e) => (
          <ProductCard data={e} />
        ))}
      </section>
    </>
  );
}

export default SingleProductPage;
