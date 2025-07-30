import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/store"
import MyOrders from "./MyOrders"
import { useEffect } from "react"
import { logoutUser } from "../redux/slices/authSlices"
import { clearCart } from "../redux/slices/cartSlices"


const Profile = () => {
  const {user} = useAppSelector((state)=>state.auth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[])

  const handleLogout = ()=>{
    dispatch(logoutUser())
    dispatch(clearCart())
    navigate("/login")
  }
  return (
    <div className="min-h-screen flex flex-col">
        <div className="flex-grow container mx-auto p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:space-x-6 md:space-y-0">
                {/* Left section */}
                <div className="w-full md:w-1/3 lg:w-1/4 shadow-xl rounded-lg p-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-4"> {user?.name}</h1>
                <p className="text-lg text-gray-600 mb-4">{user?.email}</p>
                <button className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700" onClick={handleLogout}>Logout</button>
                </div>
                {/* Right section */}
                <div className="w-full md:w-2/3 lg:w-3/4">
                <MyOrders/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile