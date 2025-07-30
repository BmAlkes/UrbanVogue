import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchUserOrders } from "../redux/slices/orderSlices";

export interface OrderItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  city: string;
  country: string;
  address?: string; // ✅ MongoDB usa 'address', não 'street'
}

// ✅ Interface para order do MongoDB
interface MongoOrder {
  _id: string;
  createdAt: string;
  shippingAddress: ShippingAddress;
  orderItemSchema: any[]; // ✅ MongoDB usa 'orderItemSchema', não 'orderItems'
  totalPrice: number;
  isPaid: boolean;
  paymentMethod: string;
  status: string;
}

const MyOrders = () => {
  const dispatch = useAppDispatch();
  const { orders, error, loading } = useAppSelector((state) => state.orders);
  console.log("Orders do Redux:", orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const navigate = useNavigate();
  
  // ✅ Usar _id em vez de id
  const handleOrderClick = (orderId: string) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      {/* Versão para desktop */}
      <div className="hidden md:block relative shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Shipping Address</th>
              <th className="py-3 px-4">Payment Method</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order: any) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleOrderClick(order._id)}
                >
                  <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id.slice(-8)} {/* ✅ Mostra últimos 8 caracteres */}
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-4 px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="py-4 px-4 capitalize">
                    {order.paymentMethod || "N/A"}
                  </td>
                  <td className="py-4 px-4">${order.totalPrice}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      } px-2 py-1 rounded shadow-sm text-sm font-medium`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Versão para mobile (cards) */}
      <div className="md:hidden space-y-4">
        {orders && orders.length > 0 ? (
          orders.map((order: any) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200 cursor-pointer"
              onClick={() => handleOrderClick(order._id)}
            >
              <div className="flex items-center mb-3 justify-between">
                <div>
                  <p className="font-bold text-gray-900">
                    #{order._id.slice(-8)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span
                    className={`${
                      order.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    } px-2 py-1 rounded shadow-sm text-xs font-medium`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Shipping to:</p>
                  <p className="font-medium">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Payment:</p>
                  <p className="font-medium capitalize">
                    {order.paymentMethod || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Status:</p>
                  <p className="font-medium">{order.status || "Processing"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total:</p>
                  <p className="font-medium text-lg">${order.totalPrice}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 text-center text-gray-500">
            You have no orders yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;