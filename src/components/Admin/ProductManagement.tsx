import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import { useEffect } from "react";
import { deleteProduct, fecthAdminProducts } from "../../redux/slices/adminProductSlice";

const ProductManagement = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.adminProducts
  );

  useEffect(() => {
    dispatch(fecthAdminProducts());
  }, [dispatch]);
  console.log(products);

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // Handle delete product logic here
      dispatch(deleteProduct(productId));
      console.log(`Product with ID ${productId} deleted`);
    }
  };
  if(loading) {
    return <div className="text-center p-4">Loading...</div>;}
  if (error) {
    return <div className="text-center p-4 text-red-500">Error:...{error}</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-600 text-xs"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-red-600 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No Products Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
