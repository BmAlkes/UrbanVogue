
import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";

interface CartDrawerProps{
drawerOpen : boolean;
toogleCartDrawer:()=> void;
}
const CartDrawer = ({drawerOpen, toogleCartDrawer}:CartDrawerProps) => {

    
  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-white shadow-2xl transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ?"translate-x-0":"translate-x-full"}`}>
        <div className="flex justify-end p-4">
            <button onClick={toogleCartDrawer}>
                <IoMdClose className="h-6 w-6 text-gray-600"/>
            </button>
        </div>
        {/* Cart Contents with scrollable area */}
        <div className="flex-grow p-4 overflow-y-auto">
            <h2 className=" absolute top-4 left-4 text-lg font-semibold mb-4 text-center">Your cart</h2>
            <CartContents/>
        </div>
        {/* Checkout button fixed at the bottom */}
        <div className="p-4 bg-white sticky bottom-0">
            <button className="w-full bg-black text-white py03 rounded-lg font-semibold hover:bg-gray-800 transition">CheckOut</button>
            <p className="text-[10px] tracking-tighter mt-2 text-gray-500 text-center">Shipping, taxes, and discout codes calculated at checkout.</p>
        </div>
    </div>
  )
}

export default CartDrawer