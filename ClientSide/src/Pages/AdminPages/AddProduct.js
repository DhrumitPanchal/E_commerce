import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../Redux/Context";
function AddProduct() {
  const { user, handelAddProduct, productData, handelUpdateProduct } =
    useContext(Context);
  const navigator = useNavigate();
  const [isForAdd, setIsForAdd] = useState(true);
  const { id } = useParams();

  const [formData, setFromData] = useState({
    product_name: "",
    product_description: "",
    product_category: "",
    product_brand: "",
    product_price: null,
    discount_rate: null,
    product_stock: null,
    Image_url: "",
  });

  const handelInput = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    isForAdd
      ? handelAddProduct(formData)
      : handelUpdateProduct(formData?._id, formData);
  };

  // useEffect(() => {
  //   user?.userRole !== "admin" && navigator("/admin");
  // });

  useEffect(() => {
    if (id) {
      setIsForAdd(false);
      const product = productData?.filter((item) => item._id === id);
      setFromData({ ...product[0] });
    }
  }, []);
  return (
    <section className=" px-[8rem] max-sm:px-[1rem] pt-[2rem] max-sm:pt-[.8rem] pb-[2rem] h-[calc(100vh-3.5rem)] flex flex-col gap-[1.2rem]">
      <h2 className="max-sm:text-end ml-[.2rem] text-[1.4rem] underline font-bold">
        {isForAdd ? "Add New Product" : "Update Product"}
      </h2>

      <form
        onSubmit={(e) => handelSubmit(e)}
        className="mt-[1rem] flex flex-col gap-[1rem] "
      >
        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          required
          onChange={(e) => handelInput(e)}
          value={formData.product_name}
          className="px-[1.4rem] py-[.2rem] rounded-[.4rem] text-[1.2rem] w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
        />

        <textarea
          type="text"
          rows={3}
          name="product_description"
          required
          onChange={(e) => handelInput(e)}
          value={formData.product_description}
          placeholder="Product Description"
          className="px-[1.4rem] py-[.2rem] rounded-[.4rem] text-[1.2rem] w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
        />

        <div className="flex gap-[1rem]">
          <select
            required
            onChange={(e) => handelInput(e)}
            value={formData.product_category}
            name="product_category"
            className="w-1/2 px-[1.4rem] py-[.4rem] rounded-[.4rem] text-[1.2rem] max-sm:w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
          >
            <option defaultChecked>Product Category</option>
            <option value="mobile">Mobile</option>
            <option value="laptop">Laptop</option>
            <option value="bag">Bag</option>
            <option value="other">other</option>
          </select>
          <select
            name="product_brand"
            required
            onChange={(e) => handelInput(e)}
            value={formData.product_brand}
            className="w-1/2 px-[1.4rem] py-[.2rem] rounded-[.4rem] text-[1.2rem] max-sm:w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
          >
            <option defaultChecked>Product Brand</option>
            <option value="mobile">Mobile</option>
            <option value="laptop">Laptop</option>
            <option value="bag">Bag</option>
            <option value="other">other</option>
          </select>
        </div>

        <div className="flex max-sm:flex-col gap-[1rem]">
          <input
            type="number"
            min={1}
            required
            onChange={(e) => handelInput(e)}
            value={formData.product_price}
            name="product_price"
            placeholder="Product Price"
            className="w-1/2 px-[1.4rem] py-[.2rem] rounded-[.4rem] text-[1.2rem] max-sm:w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
          />
          <input
            type="number"
            onChange={(e) => handelInput(e)}
            value={formData.discount_rate}
            name="discount_rate"
            placeholder="Product Discount Rate"
            className="w-1/2 px-[1.4rem] py-[.2rem] rounded-[.4rem] text-[1.2rem] max-sm:w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
          />
          <input
            type="number"
            min={1}
            required
            onChange={(e) => handelInput(e)}
            value={formData.product_stock}
            name="product_stock"
            placeholder="Product Stock"
            className="w-1/2 px-[1.4rem] py-[.2rem] rounded-[.4rem] text-[1.2rem] max-sm:w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
          />
        </div>

        <input
          type="url"
          min={1}
          name="Image_url"
          required
          onChange={(e) => handelInput(e)}
          value={formData.Image_url}
          placeholder="Product Image Url"
          className=" px-[1.4rem] py-[.2rem] rounded-[.4rem] text-[1.2rem] max-sm:w-full border-[2px] focus:border-black border-black/30 placeholder:text-black/50"
        />

        <div className="mt-[2rem] flex justify-between w-full ">
          {isForAdd ? (
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
