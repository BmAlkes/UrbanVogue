import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCountries from "../../hooks/useCountries";
import PayPalButton from "./PayPal";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { createCheckout } from "../../redux/slices/checkoutSlices";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart, loading, error } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const { getAll } = useCountries();
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [shippingAdress, setShippingAddress] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postCode: "",
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async () => {
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAdress,
          paymentMethod: "paypal",
          totalPrice: cart.totalPrice,
        })
      );
      if (res.payload && res.payload._id) {
        console.log("Checkout ID:", res.payload._id);
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handleFinalizeCheckout = async (checkoutId: string) => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/order-confirmation");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentSucess = async (details: any) => {
    const token = localStorage.getItem("token");
    console.log("Token enviado:", token);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentMethod: "paypal",
          shippingAddress: shippingAdress,
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && checkoutId) {
        await handleFinalizeCheckout(checkoutId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p>Loading Cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0)
    return <p>Your cart is empty.</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateCheckout();
          }}
        >
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user ? user.email : ""}
              className="w-full p-2 border rounded"
              placeholder="User@example.com"
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAdress,
                  email: e.target.value,
                })
              }
              required
            />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">FirstName</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAdress.name}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAdress,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700">LastName</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAdress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAdress,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              required
              value={shippingAdress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAdress,
                  address: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAdress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAdress,
                    city: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAdress.postCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAdress,
                    postCode: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Country</label>
              <select
                id="country"
                className="w-full p-2 border rounded"
                required
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAdress,
                    country: e.target.value,
                  })
                }
              >
                {getAll().map((country, index) => (
                  <option key={index} value={country.value}>
                    {country.value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAdress.phone}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAdress,
                    phone: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {!checkoutId && (
            <button
              type="submit"
              className="w-full bg-black text-white rounded py-3 mt-4"
            >
              Continue Payment
            </button>
          )}
        </form>

        {/* PayPal aparece somente depois do checkout criado */}
        {checkoutId && (
          <div className="mt-6">
            <h3 className="text-lg mb-4">Pay with Paypal</h3>
            <PayPalButton
              key={checkoutId}
              amount={cart.totalPrice.toString()}
              onSuccess={handlePaymentSucess}
              onError={() => alert("Payment Failed")}
            />
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-center py-2 border-b mb-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded mr-4"
              />
              <div className="flex-grow">
                <h4 className="text-md">{product.name}</h4>
                <p className="text-gray-500">Size: {product.size}</p>
                <p className="text-gray-500">Color: {product.color}</p>
              </div>
              <p className="text-lg font-semibold">
                ${(product?.price ?? 0).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-lg mb-2">
          <p>SubTotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between text-lg mb-2">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
