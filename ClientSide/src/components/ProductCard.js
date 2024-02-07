import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../Redux/Context";
function ProductCard(props) {
  const {
    user,
    productData,
    setProductData,
    handleLikedProducts,
    handleAddToCart,
  } = useContext(Context);
  const data = props.data;
  const [liked, setLiked] = useState(false);
  const cardRef = useRef(null);

  const navigator = useNavigate();
  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && event.target !== cardRef.current) {
        return;
      }
      navigator(`/products/${data?._id}`);
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [navigator, data?._id]);

  const handleLikeClick = (event) => {
    event.stopPropagation();
    setLiked(!liked);
    handleLikedProducts(data?._id);
  };
  useEffect(() => {
    const checkIsLiked = user?.likedProducts.some(
      (item) => item.ProductID === data?._id
    );
    console.log(checkIsLiked);
    checkIsLiked && setLiked(true);
  }, [user.likedProducts, data]);
  return (
    <>
      <div
        ref={cardRef}
        onClick={() => navigator(`/products/${data?._id}`)}
        className="product-card cursor-pointer h-fit rounded-[.6rem] shadow-[0px_2px_4px_1px_rgba(0,0,0,0.2)]"
      >
        <div className=" overflow-hidden h-[14rem] w-[16rem] max-sm:h-[10rem] max-sm:w-[12rem] flex justify-center items-center">
          <img
            src={data?.Image_url}
            alt=""
            className=" h-[9.5rem] flex justify-center items-center"
          />
        </div>
        <div className="px-[1.2rem]  py-[.8rem] flex justify-between">
          <div>
            <h3 className="text-[.8rem]">{data?.product_category}</h3>
            <h2 className="font-semibold">{data?.product_name}</h2>
            <div className="flex gap-[1rem]">
              {data?.discount_rate && (
                <h2 className="italic font-semibold text-red-700 line-through">
                  ₹{data?.product_price + (10 * data?.product_price) / 100}
                </h2>
              )}
              <h2 className="font-semibold">
                ₹{data?.product_price}{" "}
                {data?.discount_rate && `(${data?.discount_rate}%`}
              </h2>
            </div>
          </div>
          <div
            onClick={handleLikeClick}
            className="z-10 mt-[.2rem] h-fit p-[.7rem]"
          >
            {liked ? (
              <FaHeart className="text-red-500 text-[1.3rem] " />
            ) : (
              <FaRegHeart className="text-[1.3rem] " />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
