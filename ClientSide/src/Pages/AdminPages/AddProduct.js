import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function AddProduct() {
  const [isaddpro, setIsaddpro] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    id && setIsaddpro(false);
  }, []);
  return (
    <section className=" px-[8rem] pt-[2rem] pb-[2rem] h-[calc(100vh-3.5rem)] flex flex-col gap-[1.2rem]">
      <h2 className="ml-[.2rem] text-[1.4rem] underline font-semibold">
        {isaddpro ? "Add New Product" : "Update Product"}
      </h2>

      <form className="mt-[1rem] flex flex-col gap-[1rem] ">
        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          required
          className="px-[1.4rem] py-[.2rem] rounded-[.4rem] text-[1.2rem] w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
        />
        {/* <input
            type="text"
            name="product_category"
            placeholder="Product Name"
            className="px-[1.4rem] py-[.2rem] rounded-[.4rem] text-[1.2rem] w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
          /> */}

        <textarea
          type="text"
          rows={3}
          name="product_description"
          required
          placeholder="Product Description"
          className="px-[1.4rem] py-[.2rem] rounded-[.4rem] text-[1.2rem] w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
        />

        <div className="flex gap-[1rem]">
          <select
            required
            name="product_category"
            className="w-1/2 px-[1.4rem] py-[.4rem] rounded-[.4rem] text-[1.2rem] max-sm:w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
          >
            <option defaultChecked>Product Category</option>
            <option value="mobile">Mobile</option>
            <option value="laptop">Laptop</option>
            <option value="bag">Bag</option>
          </select>
          <select
            name="product_brand"
            required
            className="w-1/2 px-[1.4rem] py-[.2rem] rounded-[.4rem] text-[1.2rem] max-sm:w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
          >
            <option defaultChecked>Product Brand</option>
            <option value="mobile">Mobile</option>
            <option value="laptop">Laptop</option>
            <option value="bag">Bag</option>
          </select>
        </div>

        <div className="flex gap-[1rem]">
          <input
            type="number"
            min={1}
            required
            name="product_price"
            placeholder="Product Price"
            className="w-1/2 px-[1.4rem] py-[.2rem] rounded-[.4rem] text-[1.2rem] max-sm:w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
          />
          <input
            type="number"
            min={1}
            required
            name="discount_rate"
            placeholder="Product Discount Rate"
            className="w-1/2 px-[1.4rem] py-[.2rem] rounded-[.4rem] text-[1.2rem] max-sm:w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
          />
          <input
            type="number"
            min={1}
            required
            name="product_stock"
            placeholder="Product Discount Rate"
            className="w-1/2 px-[1.4rem] py-[.2rem] rounded-[.4rem] text-[1.2rem] max-sm:w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
          />
        </div>

        <input
          type="url"
          min={1}
          name="Image_url"
          required
          placeholder="Product Image Url"
          className=" px-[1.4rem] py-[.2rem] rounded-[.4rem] text-[1.2rem] max-sm:w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
        />

        <div className="mt-[2rem] flex justify-between w-full ">
          {isaddpro ? (
            <button
              type="submit"
              className="cursor-pointer flex items-center px-[2rem] h-[2.6rem] w-fit rounded-[.4rem] text-[1.1rem] font-semibold text-white bg-green-600"
            >
              Add
            </button>
          ) : (
            <button
              type="submit"
              className="cursor-pointer flex items-center px-[2rem] h-[2.6rem] w-fit rounded-[.4rem] text-[1.1rem] font-semibold text-white bg-green-600"
            >
              update
            </button>
          )}

          <Link to="/admin/products">
            <button className="cursor-pointer flex items-center px-[2rem] h-[2.6rem] w-fit rounded-[.4rem] text-[1.1rem] font-semibold text-white bg-red-500">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </section>
  );
}

export default AddProduct;
