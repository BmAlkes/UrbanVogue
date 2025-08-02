import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { clearCart } from "../../redux/slices/cartSlices";

const OrderConfirmationPage = () => {
  const { checkout } = useAppSelector(
    (state) => state.checkout
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

// clear the cart when order is confirm
useEffect(()=>{
  if(checkout && checkout._id){
    dispatch(clearCart())
    localStorage.removeItem('cart')
  }else{
    navigate('/my-orders')
  }
},[ checkout, dispatch, navigate])


  const calculateEstimatedDelivery = (createdAt: Date) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 12); // Add 12 days for estimated delivery

    return orderDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You four Your Order!
      </h1>
      {checkout && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          {/* Order ID */}
          <div>
            <h2 className="text-xl font-semibold">Order ID: {checkout._id}</h2>
            <p className="text-gray-500">
              Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
            </p>
          </div>
          {/* Estimative Delivery */}
          <div>
            <p className="text-emerald-700 text-sm">
              Estimated Delivery :
              {calculateEstimatedDelivery(checkout.createdAt)}
            </p>
          </div>
          {/* Ordered Items */}
          <div className="mt-20">
            {checkout.checkoutItems.map((item: any) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md">${item.price}</p>
                  <p className="text-sm text-gray-500">QTY:{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Payment and Delivery Info */}
          <div className="grid grid-cols-2 gap-8">
            {/* Payment Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">Paypal</p>
            </div>
            {/* Delivery Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city},{" "}
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
