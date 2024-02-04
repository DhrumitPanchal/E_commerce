import React from "react";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  let { pathname } = useLocation();
  let isAdminPath = pathname.slice(1, 6);
  if (isAdminPath === "admin") return;

  return (
    <>
      <footer className=" left-0 w-full pt-[1rem] bg-black text-white">
        <div className="w-full px-[4rem] max-sm:px-[2.6rem] py-[3rem] flex max-sm:flex-col gap-[4rem] max-sm:gap-[2rem]">
          <div className="flex flex-col justify-between w-1/3 max-sm:w-full">
            <h2 className="text-[1.4rem] font-semibold">ShopNest</h2>
            <p className="mt-[.6rem] text-[1rem] font-light tracking-[.1rem]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora,
              nisi. Harum alias illo consectetur quam corporis reprehenderit
              dolorem. Labore at officiis eos tenetur ipsum deleniti, hic modi
              accusantium alias veniam sint inventore distinctio asperiores.
            </p>
          </div>

          <div className="w-1/6 max-sm:w-full">
            <h2 className="text-[1.2rem] font-semibold uppercase">
              Quick Links
            </h2>
            <div className="flex flex-col mt-[.6rem] text-[1rem] tracking-[.1rem] font-light">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="cart">Cart</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/Likedproducts">Liked Products</Link>
            </div>
          </div>

          <div className="w-1/6 max-sm:w-full">
            <h2 className="text-[1.2rem] font-semibold uppercase">
              Contact us
            </h2>
            <div className="flex flex-col mt-[.6rem] text-[1rem] tracking-[.1rem] font-light">
              <h2>+91 9736359678</h2>
              <h2>+91 9836359686</h2>
              <h2>+91 9785986558</h2>
            </div>
          </div>

          <div className="w-1/4 max-sm:w-full">
            <h2 className="text-[1.2rem] font-semibold uppercase">Subscribe</h2>
            <p className="flex flex-col mt-[.6rem] text-[1rem] font-light tracking-[.1rem]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde
              perferendis enim ipsum porro nostrum odit.
            </p>
            <div className="mt-[.8rem] h-[2.6rem] flex items-center gap-[2rem]">
              <input
                type="text"
                placeholder="Enter Your Email"
                className=" px-[.6rem] py-[.4rem] border-[2px] border-white bg-black"
              />
              <div className="cursor-pointer h-full flex justify-center items-center  w-full text-[1rem] uppercase font-semibold bg-white text-black">
                Subscribe
              </div>
            </div>
          </div>
        </div>

        <div className=" w-full px-[4rem] py-[1.4rem] border-t-[1px] border-white">
          <h2 className="text-center">© 2024 ShopNest | All Rights Reserved</h2>
        </div>
      </footer>
    </>
  );
}

export default Footer;
