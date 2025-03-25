import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi"
import { HiBars3BottomRight } from "react-icons/hi2"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import { useState } from "react"
import CartDrawer from "../Layout/CartDrawer"


const Navbar = () => {
    const[drawerOpen, setDrawerOpen] = useState(false);

    const toogleCartDrawer =()=>{
        setDrawerOpen(!drawerOpen)
    }
  return (
    <>
    <nav className="container mx-auto flex items-center justify-between py-4 px-6">
         {/* Left - Logo */}
         <div>
            <Link to="/" className="text-2xl font-medium"> UrbanVogue</Link>
         </div>
         {/* Center navigatio */}
         <div className="hidden md:flex space-x-6">
            <Link to="#" className="text-gray-700 hover:text-black text-xs font-medium uppercase">
            Men
            </Link>
            <Link to="#" className="text-gray-700 hover:text-black text-xs font-medium uppercase">
            Woman
            </Link>
            <Link to="#" className="text-gray-700 hover:text-black text-xs font-medium uppercase">
            Top Wear
            </Link>
            <Link to="#" className="text-gray-700 hover:text-black text-xs font-medium uppercase">
            Bottom Wear
            </Link>
         </div>
         {/* right - icons */}
         <div className="flex items-center space-x-4">
            <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="text-gray-700"/>
            </Link>
            <button className=" relative hover:text-black" onClick={toogleCartDrawer}>
            <HiOutlineShoppingBag className="text-gray-700"/>
            <span className="absolute -top-2.5 -right-2 bg-urban-red text-white text-[10px] rounded-full px-1 ">4</span>
            </button>
            <div className="overflow-hidden">

            {/* Search */}
            <SearchBar/>
            </div>
            <button className="md:hidden ">
                <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
            </button>
           

         </div>
    </nav>
    <CartDrawer drawerOpen={drawerOpen} toogleCartDrawer={toogleCartDrawer}/>
    </>
  )
}

export default Navbar