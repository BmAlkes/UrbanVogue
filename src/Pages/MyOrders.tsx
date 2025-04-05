import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface OrderItemProps {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}
interface ShippingAddress {
    city: string;
    country: string;
    street: string;
}
interface Order {
    id: number;
    createdAt: Date;
    shippingAddress: ShippingAddress;
    orderItems: OrderItemProps[];
    totalPrice?: number;
    isPaid?: boolean;
  }



const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    //Simulate fetching data from an API

    setTimeout(() => {
      const mockOrders = [
        {
          id: 1,
          createdAt: new Date(),
          shippingAddress: {
            city: "New York",
            country: "USA",
            street: "123 Main St",
          },
          orderItems: [
            {
              id: 1,
              name: "Product 1",
              price: 100,
              quantity: 2,
              image: "https://picsum.photos/500/500?ramdom=1",
            },
            {
              id: 2,
              name: "Product 1",
              price: 100,
              quantity: 2,
              image: "https://picsum.photos/500/500?ramdom=2",
            },
          ],
          totalPrice: 200,
          isPaid: true,
          status: "Delivered",
        },
        {
          id: 2,
          createdAt: new Date(),
          shippingAddress: {
            city: "New York",
            country: "USA",
            street: "123 Main St",
          },
          orderItems: [
            {
              id: 1,
              name: "Product 1",
              price: 100,
              quantity: 2,
              image: "https://picsum.photos/500/500?ramdom=4",
            },
            {
              id: 2,
              name: "Product 1",
              price: 100,
              quantity: 2,
              image: "https://picsum.photos/500/500?ramdom=5",
            },
          ],
          totalPrice: 200,
          isPaid: true,
          status: "Delivered",
        },
        {
          id: 3,
          createdAt: new Date(),
          shippingAddress: {
            city: "New York",
            country: "USA",
            street: "123 Main St",
          },
          orderItems: [
            {
              id: 1,
              name: "Product 1",
              price: 100,
              quantity: 2,
              image: "https://picsum.photos/500/500?ramdom=3",
            },
            {
              id: 2,
              name: "Product 1",
              price: 100,
              quantity: 2,
              image: "https://picsum.photos/500/500?ramdom=6",
            },
          ],
          totalPrice: 200,
          isPaid: false,
          status: "Delivered",
        },
      ];

      setOrders(mockOrders);
    }, 2000);
  }, []);
  const navigate = useNavigate();
  const handleOrderClick = (orderId: number) => {
    navigate(`/order/${orderId}`);
  };
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
    <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
    
    {/* Versão para desktop (oculta em mobile) */}
    <div className="hidden md:block relative shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full text-left text-gray-500">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4">Order ID</th>
            <th className="py-3 px-4">Created</th>
            <th className="py-3 px-4">Shipping Address</th>
            <th className="py-3 px-4">Items</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => handleOrderClick(order.id)}>
                
                <td className="py-4 px-4">
                  <img 
                    src={order.orderItems[0].image} 
                    alt={order.orderItems[0].name} 
                    className="w-12 h-12 object-cover rounded-lg"
                    />
                </td>
                <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">#{order.id}</td>
                <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleDateString()}{" "}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </td>
                <td className="py-4 px-4">
                  {order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : 'N/A'}
                </td>
                <td className="py-4 px-4">{order.orderItems.length}</td>
                <td className="py-4 px-4">${order.totalPrice}</td>
                <td className="py-4 px-4">
                  <span 
                    className={`${
                      order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    } px-2 py-1 rounded shadow-sm text-sm font-medium`}
                    >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </td>
             
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                You have no orders yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    
    {/* Versão para mobile (cards) */}
    <div className="md:hidden space-y-4">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 cursor-pointer" onClick={() => handleOrderClick(order.id)}>
            <div className="flex items-center mb-3">
              <img 
                src={order.orderItems[0].image} 
                alt={order.orderItems[0].name} 
                className="w-16 h-16 object-cover rounded-lg mr-3"
              />
              <div>
                <p className="font-bold text-gray-900">#{order.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="ml-auto">
                <span 
                  className={`${
                    order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
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
                  {order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Items:</p>
                <p className="font-medium">{order.orderItems.length}</p>
              </div>
              <div className="col-span-2">
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
