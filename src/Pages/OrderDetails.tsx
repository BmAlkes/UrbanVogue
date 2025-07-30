import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchOrderDetails } from "../redux/slices/orderSlices";


interface ProductInfo {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface OrderItem {
  productId: ProductInfo | string; // Pode ser populado ou não
  name: string;
  size?: string;
  color?: string;
  price: number;
  image: string;
  quantity: number; 
}


const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { error, loading, orderDetails } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetails(id));
    }
  }, [dispatch, id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error: {error}</p>
      </div>
    </div>
  );

  console.log('Order Details:', orderDetails);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-yellow-100 text-yellow-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentStatusColor = (isPaid: boolean, paymentStatus: string) => {
    if (isPaid && paymentStatus === 'paid') {
      return 'bg-green-100 text-green-700';
    }
    return 'bg-red-100 text-red-700';
  };

  // Função para obter a URL completa da imagem
 
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
        Order Details
      </h2>
      
      {!orderDetails ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">No order details found</p>
        </div>
      ) : (
        <div className="bg-white p-4 sm:p-6 rounded-lg border shadow-sm">
          {/* Header com Order Info */}
          <div className="flex flex-col lg:flex-row justify-between items-start mb-8 pb-6 border-b">
            <div className="mb-4 lg:mb-0">
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                Order #{orderDetails._id?.slice(-8)}
              </h3>
              <p className="text-gray-600 flex items-center gap-2 mb-2">
                Placed on {new Date(orderDetails.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              {orderDetails.paidAt && (
                <p className="text-green-600 flex items-center gap-2">
                  Paid on {new Date(orderDetails.paidAt).toLocaleDateString()}
                </p>
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <span className={`${getPaymentStatusColor(orderDetails.isPaid, orderDetails.paymentStatus)} px-3 py-1 rounded-full text-sm font-medium`}>
                {orderDetails.isPaid ? `Paid (${orderDetails.paymentStatus})` : 'Payment Pending'}
              </span>
              
              <span className={`${getStatusColor(orderDetails.status)} px-3 py-1 rounded-full text-sm font-medium`}>
                {orderDetails.status}
              </span>
              
              <span className={`${orderDetails.isDelivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} px-3 py-1 rounded-full text-sm font-medium`}>
                {orderDetails.isDelivered ? 'Delivered' : 'Not Delivered'}
              </span>
            </div>
          </div>

          {/* Informações de Pagamento e Envio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                Payment Information
              </h4>
              <div className="space-y-2">
                <p><span className="font-medium">Method:</span> {orderDetails.paymentMethod}</p>
                <p><span className="font-medium">Status:</span> {orderDetails.paymentStatus}</p>
                <p><span className="font-medium">Total:</span> <span className="text-lg font-bold">${orderDetails.totalPrice}</span></p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                Shipping Address
              </h4>
              <div className="space-y-1">
                <p>{orderDetails.shippingAddress.address}</p>
                <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.postCode}</p>
                <p>{orderDetails.shippingAddress.country}</p>
              </div>
            </div>
          </div>

          {/* Lista de Produtos */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              Order Items ({orderDetails.orderItems?.length || 0})
            </h4>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">Product</th>
                    <th className="py-3 px-4 text-center">Unit Price</th>
                    <th className="py-3 px-4 text-center">Quantity</th>
                    <th className="py-3 px-4 text-center">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orderDetails.orderItems?.map((item: OrderItem, index: number) => {
                    console.log(item)
                    
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-image.jpg';
                              }}
                            />
                            <div className="flex-1">
                          
                            <p> {item.name}</p>
                               
                           
                              {item.size && (
                                <p className="text-sm text-gray-600">Size: {item.size}</p>
                              )}
                              {item.color && (
                                <p className="text-sm text-gray-600">Color: {item.color}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">${item.price.toFixed(2)}</td>
                        <td className="py-4 px-4 text-center">{item.quantity}</td>
                        <td className="py-4 px-4 text-center font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div className="mt-6 flex justify-end">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    Total: ${orderDetails.totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Orders */}
          <div className="mt-8 pt-6 border-t">
            <Link
              to="/my-orders"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
            >
              ← Back to My Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;