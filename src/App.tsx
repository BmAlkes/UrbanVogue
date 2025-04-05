import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout"
import Home from "./Pages/Home"
import { Toaster } from "sonner"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Profile from "./Pages/Profile"
import CollectionPage from "./Pages/CollectionPage"
import ProductsDetails from "./components/Products/ProductsDetails"
import Checkout from "./components/Cart/Checkout"
import OrderConfirmationPage from "./components/Cart/OrderConfirmationPage"
import OrderDetails from "./Pages/OrderDetails"
import MyOrders from "./Pages/MyOrders"


const App = () => {
  return (
    <BrowserRouter>
    <Toaster position="top-right"/>
    <Routes>
      <Route path="/" element={<UserLayout/>}>
      {/* User Layout */}
      <Route index element={<Home/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="colletions/:collection" element={<CollectionPage/>}/>
      <Route path="product/:id"element={<ProductsDetails/>}/>
      <Route path="checkout" element={<Checkout/>}/>
      <Route path="order-confirmation" element={<OrderConfirmationPage/>}/>
      <Route path="order/:id" element={<OrderDetails/>}/>
      <Route path="my-orders" element={<MyOrders/>}/>
      {/* Add more routes as needed */}
      </Route>
     
      {/* Admin Layout */}
    </Routes>
    </BrowserRouter>
  )
}

export default App