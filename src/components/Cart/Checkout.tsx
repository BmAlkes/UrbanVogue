import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCountries from "../../hooks/useCountries";
import PayPalButton from "./PayPal";

const cart = {
  products: [
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 100,
      image: "https://picsum.photos/500/500/?random=1",
    },
    {
      name: "Casual Shirt",
      size: "L",
      color: "Blue",
      price: 50,
      image: "https://picsum.photos/500/500/?random=2",
    },
    {
      name: "Sneakers",
      size: "10",
      color: "White",
      price: 80,
      image: "https://picsum.photos/500/500/?random=3",
    },
  ],
  totalPrice: 230,
};

const Checkout = () => {
  const { getAll } = useCountries();
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const navigate = useNavigate();
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

  const handleCreateCheckout = (e: any) => {
    e.preventDefault();
    // Simulate checkout creation
    const newCheckoutId =
      "checkout_" + Math.random().toString(36).substring(2, 15);
    setCheckoutId(newCheckoutId);

  };

  const handlePaymentSucess = (details:any) => {
    console.log("Payment successful:", details);
    navigate("/order-confirmation");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      <div className="bg-white rounded-lg p-6 ">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              placeholder="User@example.com"
              onChange={(e) =>
                setShippingAddress({ ...shippingAdress, email: e.target.value })
              }
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">FirstName</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Name"
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
                placeholder="LastName"
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
              placeholder="Address"
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
                placeholder="City"
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
                placeholder="LastName"
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
                placeholder="LastName"
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
            <div className="mt-6">
              {!checkoutId ? (
                <button
                  type="submit"
                  className="w-full bg-black text-white rounded py-3"
                >
                  Continue Payment
                </button>
              ) : (
                <div>
                  <h3 className="text-lg mb-4">Pay with Paypal</h3>
                  {/* Paypal component */}
                  <PayPalButton
                    amount={"100"}
                    onSuccess={handlePaymentSucess}
                    onError={() => alert("Payment Failed")}
                  />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      {/* Right Side  */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
            {cart.products.map((product, index) => (
                <div key={index} className="flex items-start justify-center py-2 border-b mb-4">
                    <div className="flex items-start">

                    <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded mr-4"
                    />
                    </div>
                    <div className="flex-grow">
                    <h4 className="text-md">{product.name}</h4>
                    <p className="text-gray-500">Size: {product.size}</p>
                    <p className="text-gray-500">Color: {product.color}</p>
                    </div>
                    <p className="text-lg font-semibold">${product?.price.toLocaleString()}</p>
                </div>
            ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
            <p>SubTotal</p>
            <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
            <p>Shipping</p>
            <p>Free</p>
            </div>
            <div className="flex justify-between items-center text-lg mb-4">
                <p>Total</p>
                <p>${cart.totalPrice.toLocaleString()}</p>
            </div>
      </div>
    </div>
  );
};

export default Checkout;
