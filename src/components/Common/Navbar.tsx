import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import logo from "../../assets/Urban_Vogue-removebg-preview.png";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toogleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toogleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left - Logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            {" "}
            UrbanVogue
          </Link>
        </div>
        {/* Center navigatio */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-xs font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-xs font-medium uppercase"
          >
            Woman
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-xs font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-xs font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>
        {/* right - icons */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="text-gray-700" />
          </Link>
          <button
            className=" relative hover:text-black"
            onClick={toogleCartDrawer}
          >
            <HiOutlineShoppingBag className="text-gray-700" />
            <span className="absolute -top-2.5 -right-2 bg-red-500  text-white text-[10px] rounded-full px-1 ">
              4
            </span>
          </button>
          <div className="overflow-hidden">
            {/* Search */}
            <SearchBar />
          </div>
          <button className="md:hidden" onClick={toogleNavDrawer}>
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toogleCartDrawer={toogleCartDrawer} />
      {/* mobile Navigation */}
      <div
        className={` fixed top-0 left-0 w-3/4 sm:w-1/2 md:-1/3 h-full bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className=" relative flex justify-end p-4">
          <button onClick={toogleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>

          <div>
            <img
              src={logo}
              alt=""
              className="max-w-[120px] absolute top-0 left-6"
            />
          </div>
        </div>
        <div className="p-4 mt-7">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4 ">
            <Link
              to="#"
              onClick={toogleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link>
            <Link
              to="#"
              onClick={toogleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Woman
            </Link>
            <Link
              to="#"
              onClick={toogleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Top Wear
            </Link>
            <Link
              to="#"
              onClick={toogleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
