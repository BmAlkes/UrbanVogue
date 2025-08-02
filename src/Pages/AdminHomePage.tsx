import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useEffect } from "react";
import { fecthAdminProducts } from "../redux/slices/adminProductSlice";
import { fecthAllOrders } from "../redux/slices/adminOrderSlice";

function AdminHomePage() {
  const dispatch = useAppDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useAppSelector((state) => state.adminProducts);
  const {
    orders,totalOrders,totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useAppSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fecthAdminProducts());
    dispatch(fecthAllOrders());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {productsLoading || ordersLoading ? (
        <p>Loading...</p>
      ) : productsError ? (
        <p className="text-red-500">Error fetching Products: {productsError}</p>
      ) : ordersError ? (
        <p className="text-red-500">Error fetching Orders: {ordersError}</p>
      ) : null}
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl">${totalSales.toFixed(2)}</p>
        </div>
        <div className="p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl">{totalOrders}</p>
          <Link to="/admin/orders" className="text-blue-500 hover:underline">
            Manage Orders
          </Link>
        </div>
        <div className="p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl">{products.length}</p>
          <Link to="/admin/products" className="text-blue-500 hover:underline">
            Manage Products
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border text-left border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 ">Order ID</th>
                <th className="py-3 px-4 ">Customer</th>
                <th className="py-3 px-4 ">Total Price</th>
                <th className="py-3 px-4 ">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-4">{order._id}</td>
                    <td className="p-4">{order.user.name}</td>
                    <td className="p-4">${order.totalPrice.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center">
                    No recent orders
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
